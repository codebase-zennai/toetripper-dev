-- Sample data inserts for testimonials and gallery_items
-- Run this after the schema file in Supabase SQL editor.

insert into testimonials (name, destination, rating, message, image_url, is_published)
values
('Sarah Johnson', 'Bali, Indonesia', 5, 'Toe Tripper made my dream vacation come true! Every detail was perfectly planned and executed.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Mike Chen', 'Swiss Alps', 5, 'The corporate travel experience was seamless. Professional, reliable, and genuinely caring.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Emily Rodriguez', 'Japan Explorer', 5, 'Best travel company I''ve worked with. They understand what meaningful travel really means.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('David Thompson', 'Iceland Adventure', 5, 'Exceptional service from start to finish. Toe Tripper truly delivers on their promise.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Aisha Khan', 'Morocco', 5, 'An unforgettable cultural journey — highly recommended.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Carlos Mendes', 'Portugal', 5, 'Seamless planning and thoughtful local experiences.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Lina Park', 'South Korea', 5, 'They took care of every little detail with care.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Tom Baker', 'Canada', 5, 'Excellent support throughout the trip.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Nora Ahmed', 'Egypt', 5, 'A deeply memorable and well-curated itinerary.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Oliver Grant', 'New Zealand', 5, 'Adventure-focused and safe — great guides.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Priya Mehra', 'Sri Lanka', 5, 'Thoughtful routing and warm local partnerships.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Jamal White', 'South Africa', 5, 'Impeccable logistics and great value.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Hannah Lee', 'Thailand', 5, 'Beautifully organized, great local touches.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Mateo Ruiz', 'Mexico', 5, 'Fantastic culinary experiences and smooth transport.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Sofia Petrova', 'Greece', 5, 'Romantic and relaxed — everything we wanted.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true),
('Ethan Brooks', 'Iceland', 5, 'Adventure and comfort balanced perfectly.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', true)
;

insert into gallery_items (title, description, image_url, tags, is_published)
values
('Sunset Over Hills', 'A beautiful sunset shot.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200', array['sunset','hills'], true),
('Local Market', 'Vibrant local market photography.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', array['culture','market'], true),
('Ocean Cliff', 'A dramatic ocean cliff scene.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200', array['ocean','cliff'], true),
('City Lights', 'Nighttime cityscape with glowing lights.', 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200', array['city','night'], true)
;
