import { notFound } from 'next/navigation';
import { getPageBySlug, getPublishedPages } from '@/lib/db/pages';
import { initializeDemoPages } from '@/lib/db/pages';

// Initialize demo pages
initializeDemoPages();

// Generate static params for all published pages
export async function generateStaticParams() {
  const pages = await getPublishedPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.status !== 'published') {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || '',
    keywords: page.seoKeywords?.join(', ') || '',
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || '',
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  // If page not found or not published, show 404
  if (!page || page.status !== 'published') {
    notFound();
  }

  return <PageRenderer page={page} />;
}

// Client component for rendering page content
function PageRenderer({ page }) {
  const renderContent = (content) => {
    if (!content || !content.content) return null;

    return content.content.map((node, index) => {
      switch (node.type) {
        case 'heading':
          const HeadingTag = `h${node.attrs.level}`;
          const headingClasses = {
            1: 'text-4xl font-bold mb-6 text-gray-900',
            2: 'text-3xl font-bold mb-4 text-gray-900',
            3: 'text-2xl font-semibold mb-4 text-gray-800',
            4: 'text-xl font-semibold mb-3 text-gray-800',
            5: 'text-lg font-semibold mb-2 text-gray-700',
            6: 'text-base font-semibold mb-2 text-gray-700',
          };

          return (
            <HeadingTag key={index} className={headingClasses[node.attrs.level]}>
              {renderText(node.content)}
            </HeadingTag>
          );

        case 'paragraph':
          return (
            <p key={index} className="mb-4 leading-relaxed text-gray-700">
              {renderText(node.content)}
            </p>
          );

        case 'bulletList':
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2 text-gray-700">
              {node.content?.map((item, i) => (
                <li key={i} className="ml-4">
                  {renderText(item.content?.[0]?.content)}
                </li>
              ))}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
              {node.content?.map((item, i) => (
                <li key={i} className="ml-4">
                  {renderText(item.content?.[0]?.content)}
                </li>
              ))}
            </ol>
          );

        case 'codeBlock':
          return (
            <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
              <code className="text-sm font-mono">{renderText(node.content)}</code>
            </pre>
          );

        case 'blockquote':
          return (
            <blockquote
              key={index}
              className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-600 bg-blue-50 rounded-r"
            >
              {renderContent({ content: node.content })}
            </blockquote>
          );

        case 'image':
          return (
            <img
              key={index}
              src={node.attrs.src}
              alt={node.attrs.alt || ''}
              className="max-w-full h-auto rounded-lg my-6 shadow-md"
            />
          );

        case 'horizontalRule':
          return <hr key={index} className="my-8 border-gray-300" />;

        default:
          return null;
      }
    });
  };

  const renderText = (content) => {
    if (!content || !Array.isArray(content)) return '';

    return content.map((node, index) => {
      if (node.type === 'text') {
        let text = node.text;
        let element = <span key={index}>{text}</span>;

        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case 'bold':
                element = (
                  <strong key={index} className="font-semibold">
                    {text}
                  </strong>
                );
                break;
              case 'italic':
                element = (
                  <em key={index} className="italic">
                    {text}
                  </em>
                );
                break;
              case 'strike':
                element = (
                  <s key={index} className="line-through">
                    {text}
                  </s>
                );
                break;
              case 'code':
                element = (
                  <code
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600"
                  >
                    {text}
                  </code>
                );
                break;
              case 'link':
                element = (
                  <a
                    key={index}
                    href={mark.attrs.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    {text}
                  </a>
                );
                break;
            }
          });
        }

        return element;
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-12">
          {page.featuredImage && (
            <img
              src={page.featuredImage}
              alt={page.title}
              className="w-full h-auto rounded-xl shadow-lg mb-8"
            />
          )}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{page.title}</h1>
          {page.seoDescription && (
            <p className="text-xl text-gray-600 leading-relaxed">{page.seoDescription}</p>
          )}
          <div className="flex items-center space-x-4 mt-6 text-sm text-gray-500">
            <time dateTime={page.publishedAt}>
              Published {new Date(page.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {page.updatedAt !== page.publishedAt && (
              <span>
                • Updated {new Date(page.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            {renderContent(page.content)}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </article>
    </div>
  );
}
