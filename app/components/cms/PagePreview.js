'use client';

export default function PagePreview({ page }) {
  const renderContent = (content) => {
    if (!content || !content.content) return null;

    return content.content.map((node, index) => {
      switch (node.type) {
        case 'heading':
          const HeadingTag = `h${node.attrs.level}`;
          const headingClasses = {
            1: 'text-4xl font-bold mb-4',
            2: 'text-3xl font-bold mb-3',
            3: 'text-2xl font-semibold mb-3',
            4: 'text-xl font-semibold mb-2',
            5: 'text-lg font-semibold mb-2',
            6: 'text-base font-semibold mb-2',
          };
          
          return (
            <HeadingTag key={index} className={headingClasses[node.attrs.level]}>
              {renderText(node.content)}
            </HeadingTag>
          );

        case 'paragraph':
          return (
            <p key={index} className="mb-4 leading-relaxed">
              {renderText(node.content)}
            </p>
          );

        case 'bulletList':
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2">
              {node.content?.map((item, i) => (
                <li key={i}>{renderText(item.content?.[0]?.content)}</li>
              ))}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
              {node.content?.map((item, i) => (
                <li key={i}>{renderText(item.content?.[0]?.content)}</li>
              ))}
            </ol>
          );

        case 'codeBlock':
          return (
            <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
              <code>{renderText(node.content)}</code>
            </pre>
          );

        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
              {renderContent({ content: node.content })}
            </blockquote>
          );

        case 'image':
          return (
            <img
              key={index}
              src={node.attrs.src}
              alt={node.attrs.alt || ''}
              className="max-w-full h-auto rounded-lg my-4"
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
        let className = '';
        let element = <span key={index}>{text}</span>;

        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case 'bold':
                element = <strong key={index}>{text}</strong>;
                break;
              case 'italic':
                element = <em key={index}>{text}</em>;
                break;
              case 'strike':
                element = <s key={index}>{text}</s>;
                break;
              case 'code':
                element = (
                  <code key={index} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
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
                    className="text-blue-600 underline hover:text-blue-800"
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
    <div className="bg-white rounded-lg shadow p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title || 'Untitled Page'}</h1>
          {page.seoDescription && (
            <p className="text-lg text-gray-600">{page.seoDescription}</p>
          )}
          {page.featuredImage && (
            <img
              src={page.featuredImage}
              alt={page.title}
              className="w-full h-auto rounded-lg mt-6"
            />
          )}
        </div>

        {/* Page Content */}
        <div className="prose prose-lg max-w-none">
          {renderContent(page.content)}
        </div>

        {/* SEO Preview */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">🔍 SEO Preview</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-blue-600 text-lg mb-1">
              {page.seoTitle || page.title || 'Untitled Page'}
            </div>
            <div className="text-green-700 text-sm mb-2">
              {typeof window !== 'undefined' ? window.location.origin : 'https://example.com'}/{page.slug || 'page-url'}
            </div>
            <div className="text-gray-600 text-sm">
              {page.seoDescription || 'No meta description provided'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
