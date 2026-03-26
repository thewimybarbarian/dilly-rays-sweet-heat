-- Seed menu items
insert into menu_items (name, description, price, category, image_url, heat_level, sort_order) values
  ('Pulled Pork Sandwich', 'Slow-smoked pulled pork piled high on a brioche bun with tangy slaw and pickles.', 1299, 'mains', null, 1, 1),
  ('Smoked Brisket Plate', 'Tender 14-hour brisket served with two sides and a cornbread muffin.', 1799, 'mains', null, 0, 2),
  ('Sweet Heat Wings', 'Crispy smoked wings tossed in Dilly Ray''s signature sweet heat glaze.', 1499, 'mains', null, 4, 3),
  ('The Bus Burger', 'Double smash patty with smoked gouda, caramelized onions, and jalapeño relish.', 1399, 'mains', null, 2, 4),
  ('Jalapeño Mac & Cheese', 'Creamy three-cheese mac loaded with roasted jalapeños.', 699, 'sides', null, 2, 5),
  ('Smoky Coleslaw', 'Crisp cabbage slaw with a smoky vinaigrette dressing.', 499, 'sides', null, 0, 6),
  ('Cornbread Muffins', 'Buttery cornbread muffins with a hint of honey.', 549, 'sides', null, 0, 7),
  ('Sweet Tea', 'Classic Southern sweet tea brewed fresh daily.', 349, 'drinks', null, 0, 8),
  ('Lemonade', 'Hand-squeezed lemonade — the perfect cool-down.', 399, 'drinks', null, 0, 9),
  ('Dilly Ray''s Secret Sauce', 'Our legendary hot sauce — fruity, fiery, and dangerously addictive. 8 oz bottle.', 899, 'sauces', null, 5, 10);

-- Seed upcoming locations
insert into locations (name, address, date, start_time, end_time, notes) values
  ('Riverside Park Food Truck Rally', '200 Riverside Dr, Nashville, TN 37210', '2026-04-04', '11:00', '20:00', 'Live music starts at 6 PM!'),
  ('Saturday Farmers Market', '900 Rosa L Parks Blvd, Nashville, TN 37208', '2026-04-11', '08:00', '14:00', 'We''ll be near the south entrance.'),
  ('Midtown Block Party', '1800 Division St, Nashville, TN 37203', '2026-04-18', '12:00', '22:00', 'Annual spring block party — come hungry!');
