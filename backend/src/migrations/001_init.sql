-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS users (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name     VARCHAR NOT NULL,
  role     VARCHAR NOT NULL,
  email    VARCHAR NOT NULL UNIQUE,
  phone    VARCHAR,
  password VARCHAR NOT NULL
);

-- Clubs
CREATE TABLE IF NOT EXISTS clubs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR NOT NULL,
  details          VARCHAR,
  max_participants INTEGER
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR NOT NULL,
  date             DATE NOT NULL,
  time             TIME NOT NULL,
  details          VARCHAR,
  venue            VARCHAR,
  max_participants INTEGER
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificate (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR NOT NULL,
  issue_date DATE NOT NULL,
  event_id   UUID REFERENCES events(id) ON DELETE SET NULL,
  club_id    UUID REFERENCES clubs(id)  ON DELETE SET NULL
);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_reg (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  club_id  UUID          REFERENCES clubs(id)  ON DELETE SET NULL
);
