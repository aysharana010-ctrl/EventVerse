-- =============================================================
--  EventVerse — Database Initialisation Script
--  Requires PostgreSQL 13+ (for gen_random_uuid via pgcrypto).
-- =============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- =============================================================
--  USERS
--  Stores both Students and Club Heads.
--  Role is enforced at the application layer using the `role`
--  column ('student' | 'club_head').
-- =============================================================
CREATE TABLE IF NOT EXISTS users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR     NOT NULL,
  email         VARCHAR     NOT NULL UNIQUE,
  password      VARCHAR     NOT NULL,              -- bcrypt hash
  role          VARCHAR     NOT NULL               -- 'student' | 'club_head'
                  CHECK (role IN ('student', 'club_head')),
  department    VARCHAR,
  year          INTEGER,
  phone         VARCHAR,
  profile_photo VARCHAR,                           -- URL to uploaded photo
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  CLUBS
--  Each club is owned by exactly one Club Head (user).
-- =============================================================
CREATE TABLE IF NOT EXISTS clubs (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR     NOT NULL,
  description      TEXT,
  logo_url         VARCHAR,                        -- URL to club logo/icon
  max_participants INTEGER,
  club_head_id     UUID        REFERENCES users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  CLUB MEMBERSHIPS
--  Tracks which students have joined which clubs.
--  UNIQUE constraint prevents duplicate memberships.
-- =============================================================
CREATE TABLE IF NOT EXISTS club_memberships (
  id        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID        NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  club_id   UUID        NOT NULL REFERENCES clubs(id)  ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, club_id)
);


-- =============================================================
--  EVENTS
--  Each event belongs to a club.
--  starts_at is a combined timestamp used for querying
--  upcoming vs past events and for ordering.
-- =============================================================
CREATE TABLE IF NOT EXISTS events (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR     NOT NULL,
  description      TEXT,
  venue            VARCHAR,
  starts_at        TIMESTAMPTZ NOT NULL,           -- combined date + time
  max_participants INTEGER,
  organiser_name   VARCHAR,                        -- display name of organiser
  club_id          UUID        REFERENCES clubs(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  EVENT REGISTRATIONS
--  Records a student's registration for an event.
--  attended is updated by the Club Head on the day.
--  UNIQUE constraint prevents a student registering twice.
-- =============================================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  event_id        UUID        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  attended        BOOLEAN     NOT NULL DEFAULT FALSE,
  registered_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, event_id)
);


-- =============================================================
--  CERTIFICATES
--  A certificate is awarded to a specific student for a
--  specific event. file_url points to the uploaded PDF/image
--  stored on S3 / Cloudinary / etc.
-- =============================================================
CREATE TABLE IF NOT EXISTS certificates (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR     NOT NULL,
  file_url   VARCHAR,                             -- URL to certificate file
  issue_date DATE        NOT NULL DEFAULT CURRENT_DATE,
  user_id    UUID        NOT NULL REFERENCES users(id)   ON DELETE CASCADE,
  event_id   UUID        REFERENCES events(id) ON DELETE SET NULL,
  club_id    UUID        REFERENCES clubs(id)  ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  NOTIFICATIONS
--  Per-user notification feed for the bell dropdown.
--  Rows are inserted by the server on key actions:
--    - event registration confirmed
--    - attendance marked
--    - certificate uploaded
-- =============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message    TEXT        NOT NULL,
  is_read    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  PASSWORD RESET TOKENS
--  Short-lived tokens emailed to users for password reset.
--  `used` is flipped to TRUE once consumed so tokens cannot
--  be replayed.
-- =============================================================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      VARCHAR     NOT NULL UNIQUE,          -- secure random string
  expires_at TIMESTAMPTZ NOT NULL,
  used       BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =============================================================
--  INDEXES
--  Added on every foreign key and common filter/sort column
--  to keep queries fast as data grows.
-- =============================================================

-- users
CREATE INDEX IF NOT EXISTS idx_users_email          ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role           ON users (role);

-- clubs
CREATE INDEX IF NOT EXISTS idx_clubs_club_head_id   ON clubs (club_head_id);

-- club_memberships
CREATE INDEX IF NOT EXISTS idx_club_mem_user_id     ON club_memberships (user_id);
CREATE INDEX IF NOT EXISTS idx_club_mem_club_id     ON club_memberships (club_id);

-- events
CREATE INDEX IF NOT EXISTS idx_events_club_id       ON events (club_id);
CREATE INDEX IF NOT EXISTS idx_events_starts_at     ON events (starts_at);

-- event_registrations
CREATE INDEX IF NOT EXISTS idx_event_reg_user_id    ON event_registrations (user_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_event_id   ON event_registrations (event_id);

-- certificates
CREATE INDEX IF NOT EXISTS idx_certs_user_id        ON certificates (user_id);
CREATE INDEX IF NOT EXISTS idx_certs_event_id       ON certificates (event_id);
CREATE INDEX IF NOT EXISTS idx_certs_club_id        ON certificates (club_id);

-- notifications
CREATE INDEX IF NOT EXISTS idx_notif_user_id        ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notif_is_read        ON notifications (user_id, is_read);

-- password_reset_tokens
CREATE INDEX IF NOT EXISTS idx_prt_token            ON password_reset_tokens (token);
CREATE INDEX IF NOT EXISTS idx_prt_user_id          ON password_reset_tokens (user_id);