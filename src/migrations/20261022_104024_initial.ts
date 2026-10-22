import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_pages_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_domains_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_domains_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_domains_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__domains_v_version_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__domains_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__domains_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__domains_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_projects_project_status" AS ENUM('planned', 'ongoing', 'completed');
  CREATE TYPE "public"."enum_projects_location_scope" AS ENUM('local', 'national', 'regional');
  CREATE TYPE "public"."enum_projects_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_location_scope" AS ENUM('local', 'national', 'regional');
  CREATE TYPE "public"."enum__projects_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_news_category" AS ENUM('institutional', 'partnership', 'field', 'event', 'statement', 'innovation');
  CREATE TYPE "public"."enum_news_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('institutional', 'partnership', 'field', 'event', 'statement', 'innovation');
  CREATE TYPE "public"."enum__news_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_publications_type" AS ENUM('report', 'study', 'technical-note', 'guide', 'scientific', 'press-release', 'public-document');
  CREATE TYPE "public"."enum_publications_document_language" AS ENUM('fr', 'en', 'fr-en');
  CREATE TYPE "public"."enum_publications_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_type" AS ENUM('report', 'study', 'technical-note', 'guide', 'scientific', 'press-release', 'public-document');
  CREATE TYPE "public"."enum__publications_v_version_document_language" AS ENUM('fr', 'en', 'fr-en');
  CREATE TYPE "public"."enum__publications_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_events_format" AS ENUM('in-person', 'online', 'hybrid');
  CREATE TYPE "public"."enum_events_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_format" AS ENUM('in-person', 'online', 'hybrid');
  CREATE TYPE "public"."enum__events_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_faqs_scope" AS ENUM('saagdo', 'partners', 'general');
  CREATE TYPE "public"."enum_faqs_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_scope" AS ENUM('saagdo', 'partners', 'general');
  CREATE TYPE "public"."enum__faqs_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_partners_category" AS ENUM('institutional', 'technical', 'scientific', 'financial', 'technological', 'community');
  CREATE TYPE "public"."enum_partners_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_partners_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_v_version_category" AS ENUM('institutional', 'technical', 'scientific', 'financial', 'technological', 'community');
  CREATE TYPE "public"."enum__partners_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__partners_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__partners_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_team_members_group" AS ENUM('board', 'executive', 'team', 'advisors');
  CREATE TYPE "public"."enum_team_members_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_version_group" AS ENUM('board', 'executive', 'team', 'advisors');
  CREATE TYPE "public"."enum__team_members_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_testimonials_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__testimonials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimonials_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_impact_metrics_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_impact_metrics_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_impact_metrics_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__impact_metrics_v_version_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__impact_metrics_v_version_review_status" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__impact_metrics_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__impact_metrics_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_media_provenance" AS ENUM('official', 'field', 'illustrative', 'to-verify');
  CREATE TYPE "public"."enum_contact_submissions_subject" AS ENUM('general', 'partnership', 'saagdo', 'media', 'join', 'other');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in-progress', 'answered', 'closed', 'spam');
  CREATE TYPE "public"."enum_contact_submissions_notification" AS ENUM('sent', 'failed', 'not-configured');
  CREATE TYPE "public"."enum_partnership_requests_collaboration_type" AS ENUM('institutional', 'technical', 'scientific', 'financial', 'technological', 'community', 'saagdo', 'other');
  CREATE TYPE "public"."enum_partnership_requests_status" AS ENUM('new', 'in-progress', 'answered', 'closed', 'spam');
  CREATE TYPE "public"."enum_partnership_requests_notification" AS ENUM('sent', 'failed', 'not-configured');
  CREATE TYPE "public"."enum_newsletter_subscriptions_status" AS ENUM('subscribed', 'unsubscribed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('superadmin', 'admin', 'editor', 'contributor');
  CREATE TYPE "public"."enum_audit_logs_action" AS ENUM('create', 'update', 'publish', 'unpublish', 'delete', 'login', 'logout', 'login-failed', 'form-submission');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'purgeExpiredSubmissions', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'purgeExpiredSubmissions', 'schedulePublish');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_about_page_milestones_date_precision" AS ENUM('day', 'month', 'year');
  CREATE TYPE "public"."enum_about_page_values_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_milestones_date_precision" AS ENUM('day', 'month', 'year');
  CREATE TYPE "public"."enum__about_page_v_version_values_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_saagdo_page_problems_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_saagdo_page_components_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_saagdo_page_flow_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum_saagdo_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__saagdo_page_v_version_problems_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__saagdo_page_v_version_components_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__saagdo_page_v_version_flow_icon" AS ENUM('thermometer-sun', 'droplets', 'leaf', 'trees', 'cpu', 'brain-circuit', 'microscope', 'graduation-cap', 'users', 'map', 'satellite', 'sprout', 'recycle', 'sun', 'shield-check', 'handshake', 'globe', 'line-chart', 'megaphone', 'lightbulb', 'scale', 'eye', 'heart-handshake', 'flask-conical');
  CREATE TYPE "public"."enum__saagdo_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__saagdo_page_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('facebook', 'linkedin', 'x', 'youtube', 'instagram', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum_navigation_header_children_route" AS ENUM('/', '/about', '/about/history', '/about/mission', '/about/governance', '/about/team', '/domains', '/projects', '/projects/ongoing', '/projects/completed', '/saagdo', '/news', '/events', '/publications', '/publications/reports', '/gallery', '/partners', '/partners/become', '/join', '/contact', '/search', '/legal', '/privacy', '/terms');
  CREATE TYPE "public"."enum_navigation_header_route" AS ENUM('/', '/about', '/about/history', '/about/mission', '/about/governance', '/about/team', '/domains', '/projects', '/projects/ongoing', '/projects/completed', '/saagdo', '/news', '/events', '/publications', '/publications/reports', '/gallery', '/partners', '/partners/become', '/join', '/contact', '/search', '/legal', '/privacy', '/terms');
  CREATE TYPE "public"."enum_navigation_footer_columns_links_route" AS ENUM('/', '/about', '/about/history', '/about/mission', '/about/governance', '/about/team', '/domains', '/projects', '/projects/ongoing', '/projects/completed', '/saagdo', '/news', '/events', '/publications', '/publications/reports', '/gallery', '/partners', '/partners/become', '/join', '/contact', '/search', '/legal', '/privacy', '/terms');
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"last_reviewed" timestamp(3) with time zone,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_pages_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_last_reviewed" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__pages_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_intro" varchar,
  	"version_content" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "domains_focus_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "domains" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum_domains_icon",
  	"order" numeric DEFAULT 0,
  	"image_id" integer,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_domains_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_domains_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "domains_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_domains_v_version_focus_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_domains_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_icon" "enum__domains_v_version_icon",
  	"version_order" numeric DEFAULT 0,
  	"version_image_id" integer,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__domains_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__domains_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__domains_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_domains_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"verified" boolean DEFAULT false,
  	"source_url" varchar
  );
  
  CREATE TABLE "projects_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"unit" varchar,
  	"verified" boolean DEFAULT false,
  	"source_url" varchar
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"status" "enum_projects_project_status" DEFAULT 'ongoing',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location_scope" "enum_projects_location_scope" DEFAULT 'local',
  	"location_locality" varchar,
  	"location_region" varchar,
  	"location_country" varchar DEFAULT 'Burkina Faso',
  	"location_latitude" numeric,
  	"location_longitude" numeric,
  	"location_coordinates_verified" boolean DEFAULT false,
  	"featured" boolean DEFAULT false,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_projects_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"context" jsonb,
  	"target_audience" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"domains_id" integer,
  	"partners_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "_projects_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"verified" boolean DEFAULT false,
  	"source_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_indicators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"unit" varchar,
  	"verified" boolean DEFAULT false,
  	"source_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_status" "enum_projects_project_status" DEFAULT 'ongoing',
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location_scope" "enum__projects_v_version_location_scope" DEFAULT 'local',
  	"version_location_locality" varchar,
  	"version_location_region" varchar,
  	"version_location_country" varchar DEFAULT 'Burkina Faso',
  	"version_location_latitude" numeric,
  	"version_location_longitude" numeric,
  	"version_location_coordinates_verified" boolean DEFAULT false,
  	"version_featured" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__projects_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_context" jsonb,
  	"version_target_audience" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"domains_id" integer,
  	"partners_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cover_image_id" integer,
  	"category" "enum_news_category" DEFAULT 'institutional',
  	"published_at" timestamp(3) with time zone,
  	"author_name" varchar,
  	"archived" boolean DEFAULT false,
  	"source_url" varchar,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_news_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_category" "enum__news_v_version_category" DEFAULT 'institutional',
  	"version_published_at" timestamp(3) with time zone,
  	"version_author_name" varchar,
  	"version_archived" boolean DEFAULT false,
  	"version_source_url" varchar,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__news_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_publications_type",
  	"file_id" integer,
  	"external_url" varchar,
  	"cover_image_id" integer,
  	"authors" varchar,
  	"document_language" "enum_publications_document_language" DEFAULT 'fr',
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_publications_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "publications_locales" (
  	"title" varchar,
  	"description" varchar,
  	"body" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__publications_v_version_type",
  	"version_file_id" integer,
  	"version_external_url" varchar,
  	"version_cover_image_id" integer,
  	"version_authors" varchar,
  	"version_document_language" "enum__publications_v_version_document_language" DEFAULT 'fr',
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__publications_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__publications_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_publications_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_body" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"format" "enum_events_format" DEFAULT 'in-person',
  	"cancelled" boolean DEFAULT false,
  	"cover_image_id" integer,
  	"registration_url" varchar,
  	"related_news_id" integer,
  	"slug" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"created_by_id" integer,
  	"review_status" "enum_events_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"location" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_format" "enum__events_v_version_format" DEFAULT 'in-person',
  	"version_cancelled" boolean DEFAULT false,
  	"version_cover_image_id" integer,
  	"version_registration_url" varchar,
  	"version_related_news_id" integer,
  	"version_slug" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__events_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_location" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"scope" "enum_faqs_scope" DEFAULT 'general',
  	"order" numeric DEFAULT 0,
  	"created_by_id" integer,
  	"review_status" "enum_faqs_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_scope" "enum__faqs_v_version_scope" DEFAULT 'general',
  	"version_order" numeric DEFAULT 0,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__faqs_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__faqs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_faqs_v_locales" (
  	"version_question" varchar,
  	"version_answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_collaboration_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"category" "enum_partners_category",
  	"agreement_date" timestamp(3) with time zone,
  	"source_url" varchar,
  	"order" numeric DEFAULT 0,
  	"slug" varchar,
  	"created_by_id" integer,
  	"review_status" "enum_partners_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_partners_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "partners_locales" (
  	"name" varchar,
  	"acronym" varchar,
  	"description" varchar,
  	"agreement_type" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_partners_v_version_collaboration_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_partners_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_logo_id" integer,
  	"version_website" varchar,
  	"version_category" "enum__partners_v_version_category",
  	"version_agreement_date" timestamp(3) with time zone,
  	"version_source_url" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_slug" varchar,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__partners_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__partners_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__partners_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_partners_v_locales" (
  	"version_name" varchar,
  	"version_acronym" varchar,
  	"version_description" varchar,
  	"version_agreement_type" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"group" "enum_team_members_group" DEFAULT 'team',
  	"photo_id" integer,
  	"linkedin" varchar,
  	"consent_to_publish" boolean DEFAULT false,
  	"order" numeric DEFAULT 100,
  	"created_by_id" integer,
  	"review_status" "enum_team_members_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "team_members_locales" (
  	"position" varchar,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_group" "enum__team_members_v_version_group" DEFAULT 'team',
  	"version_photo_id" integer,
  	"version_linkedin" varchar,
  	"version_consent_to_publish" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 100,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__team_members_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__team_members_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_team_members_v_locales" (
  	"version_position" varchar,
  	"version_bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar,
  	"photo_id" integer,
  	"consent_obtained" boolean DEFAULT false,
  	"project_id" integer,
  	"created_by_id" integer,
  	"review_status" "enum_testimonials_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimonials_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar,
  	"author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_testimonials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_author_name" varchar,
  	"version_photo_id" integer,
  	"version_consent_obtained" boolean DEFAULT false,
  	"version_project_id" integer,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__testimonials_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimonials_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__testimonials_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_testimonials_v_locales" (
  	"version_quote" varchar,
  	"version_author_role" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "impact_metrics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"icon" "enum_impact_metrics_icon",
  	"verified_by" varchar,
  	"verification_date" timestamp(3) with time zone,
  	"source_url" varchar,
  	"order" numeric DEFAULT 0,
  	"created_by_id" integer,
  	"review_status" "enum_impact_metrics_review_status" DEFAULT 'draft',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_impact_metrics_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "impact_metrics_locales" (
  	"label" varchar,
  	"unit" varchar,
  	"description" varchar,
  	"period" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_impact_metrics_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_value" numeric,
  	"version_icon" "enum__impact_metrics_v_version_icon",
  	"version_verified_by" varchar,
  	"version_verification_date" timestamp(3) with time zone,
  	"version_source_url" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_created_by_id" integer,
  	"version_review_status" "enum__impact_metrics_v_version_review_status" DEFAULT 'draft',
  	"version_review_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__impact_metrics_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__impact_metrics_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_impact_metrics_v_locales" (
  	"version_label" varchar,
  	"version_unit" varchar,
  	"version_description" varchar,
  	"version_period" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"credit" varchar,
  	"provenance" "enum_media_provenance" DEFAULT 'to-verify' NOT NULL,
  	"seed_key" varchar,
  	"show_in_gallery" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "documents_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"organization" varchar,
  	"subject" "enum_contact_submissions_subject" NOT NULL,
  	"subject_line" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"locale" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"notification" "enum_contact_submissions_notification" DEFAULT 'not-configured',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partnership_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"country" varchar NOT NULL,
  	"collaboration_type" "enum_partnership_requests_collaboration_type" NOT NULL,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"attachment_id" integer,
  	"status" "enum_partnership_requests_status" DEFAULT 'new',
  	"internal_notes" varchar,
  	"locale" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"notification" "enum_partnership_requests_notification" DEFAULT 'not-configured',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscriptions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_newsletter_subscriptions_status" DEFAULT 'subscribed',
  	"locale" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"unsubscribed_at" timestamp(3) with time zone,
  	"unsubscribe_token" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submission_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'contributor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"action" "enum_audit_logs_action" NOT NULL,
  	"entity" varchar NOT NULL,
  	"entity_id" varchar,
  	"summary" varchar,
  	"user_id" integer,
  	"user_email" varchar,
  	"ip_network" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"meta" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"domains_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"publications_id" integer,
  	"events_id" integer,
  	"faqs_id" integer,
  	"partners_id" integer,
  	"team_members_id" integer,
  	"testimonials_id" integer,
  	"impact_metrics_id" integer,
  	"media_id" integer,
  	"documents_id" integer,
  	"contact_submissions_id" integer,
  	"partnership_requests_id" integer,
  	"newsletter_subscriptions_id" integer,
  	"submission_files_id" integer,
  	"users_id" integer,
  	"audit_logs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_video_id" integer,
  	"intro_image_id" integer,
  	"intro_secondary_image_id" integer,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"intro_eyebrow" varchar,
  	"intro_title" varchar,
  	"intro_text" varchar,
  	"intro_mission" varchar,
  	"saagdo_title" varchar,
  	"saagdo_text" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_video_id" integer,
  	"version_intro_image_id" integer,
  	"version_intro_secondary_image_id" integer,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__homepage_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_homepage_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_intro_eyebrow" varchar,
  	"version_intro_title" varchar,
  	"version_intro_text" varchar,
  	"version_intro_mission" varchar,
  	"version_saagdo_title" varchar,
  	"version_saagdo_text" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "about_page_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"date_precision" "enum_about_page_milestones_date_precision" DEFAULT 'day',
  	"source_url" varchar
  );
  
  CREATE TABLE "about_page_milestones_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_values_icon"
  );
  
  CREATE TABLE "about_page_values_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_commitments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_commitments_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"presentation_image_id" integer,
  	"president_message_enabled" boolean DEFAULT false,
  	"president_message_author_id" integer,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"presentation" jsonb,
  	"history_intro" jsonb,
  	"mission" varchar,
  	"vision" varchar,
  	"governance" jsonb,
  	"president_message_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "_about_page_v_version_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"date_precision" "enum__about_page_v_version_milestones_date_precision" DEFAULT 'day',
  	"source_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_milestones_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_values_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_values_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_version_commitments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_commitments_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_presentation_image_id" integer,
  	"version_president_message_enabled" boolean DEFAULT false,
  	"version_president_message_author_id" integer,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_about_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_presentation" jsonb,
  	"version_history_intro" jsonb,
  	"version_mission" varchar,
  	"version_vision" varchar,
  	"version_governance" jsonb,
  	"version_president_message_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "saagdo_page_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_saagdo_page_problems_icon"
  );
  
  CREATE TABLE "saagdo_page_problems_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "saagdo_page_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_saagdo_page_components_icon"
  );
  
  CREATE TABLE "saagdo_page_components_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "saagdo_page_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_saagdo_page_flow_icon"
  );
  
  CREATE TABLE "saagdo_page_flow_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "saagdo_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"partnership_source_url" varchar,
  	"platform_url" varchar,
  	"show_demo" boolean DEFAULT true,
  	"_status" "enum_saagdo_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "saagdo_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"problem_intro" varchar,
  	"solution_intro" varchar,
  	"partnership_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_saagdo_page_v_version_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__saagdo_page_v_version_problems_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_saagdo_page_v_version_problems_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_saagdo_page_v_version_components" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__saagdo_page_v_version_components_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_saagdo_page_v_version_components_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_saagdo_page_v_version_flow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__saagdo_page_v_version_flow_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_saagdo_page_v_version_flow_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_saagdo_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_partnership_source_url" varchar,
  	"version_platform_url" varchar,
  	"version_show_demo" boolean DEFAULT true,
  	"version__status" "enum__saagdo_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__saagdo_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_saagdo_page_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_problem_intro" varchar,
  	"version_solution_intro" varchar,
  	"version_partnership_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"verified" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"short_name" varchar DEFAULT 'ACIEA' NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"founded_year" numeric,
  	"registration_number" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"city" varchar DEFAULT 'Ouagadougou',
  	"hq_latitude" numeric,
  	"hq_longitude" numeric,
  	"data_retention_months" numeric DEFAULT 24,
  	"default_og_image_id" integer,
  	"english_validated" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"organization_name" varchar NOT NULL,
  	"tagline" varchar,
  	"description" varchar,
  	"legal_status" varchar,
  	"address" varchar,
  	"country" varchar,
  	"data_controller" varchar,
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "navigation_header_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"route" "enum_navigation_header_children_route",
  	"url" varchar
  );
  
  CREATE TABLE "navigation_header_children_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"route" "enum_navigation_header_route",
  	"url" varchar
  );
  
  CREATE TABLE "navigation_header_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"route" "enum_navigation_footer_columns_links_route",
  	"url" varchar
  );
  
  CREATE TABLE "navigation_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_jobs_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stats" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_focus_points" ADD CONSTRAINT "domains_focus_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains_locales" ADD CONSTRAINT "domains_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_domains_v_version_focus_points" ADD CONSTRAINT "_domains_v_version_focus_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_domains_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_parent_id_domains_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."domains"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v_locales" ADD CONSTRAINT "_domains_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_domains_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_objectives" ADD CONSTRAINT "projects_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_activities" ADD CONSTRAINT "projects_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_achievements" ADD CONSTRAINT "projects_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_indicators" ADD CONSTRAINT "projects_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_objectives" ADD CONSTRAINT "_projects_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_activities" ADD CONSTRAINT "_projects_v_version_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_achievements" ADD CONSTRAINT "_projects_v_version_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_indicators" ADD CONSTRAINT "_projects_v_version_indicators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_texts" ADD CONSTRAINT "news_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_texts" ADD CONSTRAINT "_news_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_file_id_documents_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_rels" ADD CONSTRAINT "_publications_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_related_news_id_news_id_fk" FOREIGN KEY ("related_news_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_related_news_id_news_id_fk" FOREIGN KEY ("version_related_news_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_locales" ADD CONSTRAINT "_faqs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_collaboration_areas" ADD CONSTRAINT "partners_collaboration_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v_version_collaboration_areas" ADD CONSTRAINT "_partners_v_version_collaboration_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_parent_id_partners_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v" ADD CONSTRAINT "_partners_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_partners_v_locales" ADD CONSTRAINT "_partners_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_partners_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v_locales" ADD CONSTRAINT "_team_members_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_members_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_parent_id_testimonials_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_project_id_projects_id_fk" FOREIGN KEY ("version_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v" ADD CONSTRAINT "_testimonials_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimonials_v_locales" ADD CONSTRAINT "_testimonials_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_testimonials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_metrics" ADD CONSTRAINT "impact_metrics_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_metrics_locales" ADD CONSTRAINT "impact_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_metrics_v" ADD CONSTRAINT "_impact_metrics_v_parent_id_impact_metrics_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_metrics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_metrics_v" ADD CONSTRAINT "_impact_metrics_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_metrics_v_locales" ADD CONSTRAINT "_impact_metrics_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_metrics_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documents_locales" ADD CONSTRAINT "documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partnership_requests" ADD CONSTRAINT "partnership_requests_attachment_id_submission_files_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."submission_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impact_metrics_fk" FOREIGN KEY ("impact_metrics_id") REFERENCES "public"."impact_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partnership_requests_fk" FOREIGN KEY ("partnership_requests_id") REFERENCES "public"."partnership_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscriptions_fk" FOREIGN KEY ("newsletter_subscriptions_id") REFERENCES "public"."newsletter_subscriptions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submission_files_fk" FOREIGN KEY ("submission_files_id") REFERENCES "public"."submission_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_intro_image_id_media_id_fk" FOREIGN KEY ("intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_intro_secondary_image_id_media_id_fk" FOREIGN KEY ("intro_secondary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_intro_image_id_media_id_fk" FOREIGN KEY ("version_intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_intro_secondary_image_id_media_id_fk" FOREIGN KEY ("version_intro_secondary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_milestones" ADD CONSTRAINT "about_page_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_milestones_locales" ADD CONSTRAINT "about_page_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_locales" ADD CONSTRAINT "about_page_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_commitments" ADD CONSTRAINT "about_page_commitments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_commitments_locales" ADD CONSTRAINT "about_page_commitments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_commitments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_presentation_image_id_media_id_fk" FOREIGN KEY ("presentation_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_president_message_author_id_team_members_id_fk" FOREIGN KEY ("president_message_author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_milestones" ADD CONSTRAINT "_about_page_v_version_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_milestones_locales" ADD CONSTRAINT "_about_page_v_version_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values" ADD CONSTRAINT "_about_page_v_version_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_locales" ADD CONSTRAINT "_about_page_v_version_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_commitments" ADD CONSTRAINT "_about_page_v_version_commitments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_commitments_locales" ADD CONSTRAINT "_about_page_v_version_commitments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v_version_commitments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_presentation_image_id_media_id_fk" FOREIGN KEY ("version_presentation_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_president_message_author_id_team_members_id_fk" FOREIGN KEY ("version_president_message_author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_rels" ADD CONSTRAINT "_about_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_rels" ADD CONSTRAINT "_about_page_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_problems" ADD CONSTRAINT "saagdo_page_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_problems_locales" ADD CONSTRAINT "saagdo_page_problems_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_components" ADD CONSTRAINT "saagdo_page_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_components_locales" ADD CONSTRAINT "saagdo_page_components_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_flow" ADD CONSTRAINT "saagdo_page_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page_flow_locales" ADD CONSTRAINT "saagdo_page_flow_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "saagdo_page" ADD CONSTRAINT "saagdo_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "saagdo_page_locales" ADD CONSTRAINT "saagdo_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."saagdo_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_problems" ADD CONSTRAINT "_saagdo_page_v_version_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_problems_locales" ADD CONSTRAINT "_saagdo_page_v_version_problems_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v_version_problems"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_components" ADD CONSTRAINT "_saagdo_page_v_version_components_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_components_locales" ADD CONSTRAINT "_saagdo_page_v_version_components_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v_version_components"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_flow" ADD CONSTRAINT "_saagdo_page_v_version_flow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_version_flow_locales" ADD CONSTRAINT "_saagdo_page_v_version_flow_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v_version_flow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v" ADD CONSTRAINT "_saagdo_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v_locales" ADD CONSTRAINT "_saagdo_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_saagdo_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_texts" ADD CONSTRAINT "site_settings_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_children" ADD CONSTRAINT "navigation_header_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_children_locales" ADD CONSTRAINT "navigation_header_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_locales" ADD CONSTRAINT "navigation_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links_locales" ADD CONSTRAINT "navigation_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_locales" ADD CONSTRAINT "navigation_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_created_by_idx" ON "pages" USING btree ("created_by_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "domains_focus_points_order_idx" ON "domains_focus_points" USING btree ("_order");
  CREATE INDEX "domains_focus_points_parent_id_idx" ON "domains_focus_points" USING btree ("_parent_id");
  CREATE INDEX "domains_focus_points_locale_idx" ON "domains_focus_points" USING btree ("_locale");
  CREATE INDEX "domains_image_idx" ON "domains" USING btree ("image_id");
  CREATE UNIQUE INDEX "domains_slug_idx" ON "domains" USING btree ("slug");
  CREATE INDEX "domains_seo_seo_og_image_idx" ON "domains" USING btree ("seo_og_image_id");
  CREATE INDEX "domains_created_by_idx" ON "domains" USING btree ("created_by_id");
  CREATE INDEX "domains_updated_at_idx" ON "domains" USING btree ("updated_at");
  CREATE INDEX "domains_created_at_idx" ON "domains" USING btree ("created_at");
  CREATE INDEX "domains__status_idx" ON "domains" USING btree ("_status");
  CREATE UNIQUE INDEX "domains_locales_locale_parent_id_unique" ON "domains_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "domains_locales_parent_id_idx" ON "domains_locales" USING btree ("_parent_id");
  CREATE INDEX "_domains_v_version_focus_points_order_idx" ON "_domains_v_version_focus_points" USING btree ("_order");
  CREATE INDEX "_domains_v_version_focus_points_parent_id_idx" ON "_domains_v_version_focus_points" USING btree ("_parent_id");
  CREATE INDEX "_domains_v_version_focus_points_locale_idx" ON "_domains_v_version_focus_points" USING btree ("_locale");
  CREATE INDEX "_domains_v_parent_idx" ON "_domains_v" USING btree ("parent_id");
  CREATE INDEX "_domains_v_version_version_image_idx" ON "_domains_v" USING btree ("version_image_id");
  CREATE INDEX "_domains_v_version_version_slug_idx" ON "_domains_v" USING btree ("version_slug");
  CREATE INDEX "_domains_v_version_seo_version_seo_og_image_idx" ON "_domains_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_domains_v_version_version_created_by_idx" ON "_domains_v" USING btree ("version_created_by_id");
  CREATE INDEX "_domains_v_version_version_updated_at_idx" ON "_domains_v" USING btree ("version_updated_at");
  CREATE INDEX "_domains_v_version_version_created_at_idx" ON "_domains_v" USING btree ("version_created_at");
  CREATE INDEX "_domains_v_version_version__status_idx" ON "_domains_v" USING btree ("version__status");
  CREATE INDEX "_domains_v_created_at_idx" ON "_domains_v" USING btree ("created_at");
  CREATE INDEX "_domains_v_updated_at_idx" ON "_domains_v" USING btree ("updated_at");
  CREATE INDEX "_domains_v_snapshot_idx" ON "_domains_v" USING btree ("snapshot");
  CREATE INDEX "_domains_v_published_locale_idx" ON "_domains_v" USING btree ("published_locale");
  CREATE INDEX "_domains_v_latest_idx" ON "_domains_v" USING btree ("latest");
  CREATE INDEX "_domains_v_autosave_idx" ON "_domains_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_domains_v_locales_locale_parent_id_unique" ON "_domains_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_domains_v_locales_parent_id_idx" ON "_domains_v_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_objectives_order_idx" ON "projects_objectives" USING btree ("_order");
  CREATE INDEX "projects_objectives_parent_id_idx" ON "projects_objectives" USING btree ("_parent_id");
  CREATE INDEX "projects_objectives_locale_idx" ON "projects_objectives" USING btree ("_locale");
  CREATE INDEX "projects_activities_order_idx" ON "projects_activities" USING btree ("_order");
  CREATE INDEX "projects_activities_parent_id_idx" ON "projects_activities" USING btree ("_parent_id");
  CREATE INDEX "projects_activities_locale_idx" ON "projects_activities" USING btree ("_locale");
  CREATE INDEX "projects_achievements_order_idx" ON "projects_achievements" USING btree ("_order");
  CREATE INDEX "projects_achievements_parent_id_idx" ON "projects_achievements" USING btree ("_parent_id");
  CREATE INDEX "projects_achievements_locale_idx" ON "projects_achievements" USING btree ("_locale");
  CREATE INDEX "projects_indicators_order_idx" ON "projects_indicators" USING btree ("_order");
  CREATE INDEX "projects_indicators_parent_id_idx" ON "projects_indicators" USING btree ("_parent_id");
  CREATE INDEX "projects_indicators_locale_idx" ON "projects_indicators" USING btree ("_locale");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_links_locale_idx" ON "projects_links" USING btree ("_locale");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_created_by_idx" ON "projects" USING btree ("created_by_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_domains_id_idx" ON "projects_rels" USING btree ("domains_id");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "projects_rels_documents_id_idx" ON "projects_rels" USING btree ("documents_id");
  CREATE INDEX "projects_rels_news_id_idx" ON "projects_rels" USING btree ("news_id");
  CREATE INDEX "_projects_v_version_objectives_order_idx" ON "_projects_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_projects_v_version_objectives_parent_id_idx" ON "_projects_v_version_objectives" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_objectives_locale_idx" ON "_projects_v_version_objectives" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_activities_order_idx" ON "_projects_v_version_activities" USING btree ("_order");
  CREATE INDEX "_projects_v_version_activities_parent_id_idx" ON "_projects_v_version_activities" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_activities_locale_idx" ON "_projects_v_version_activities" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_achievements_order_idx" ON "_projects_v_version_achievements" USING btree ("_order");
  CREATE INDEX "_projects_v_version_achievements_parent_id_idx" ON "_projects_v_version_achievements" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_achievements_locale_idx" ON "_projects_v_version_achievements" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_indicators_order_idx" ON "_projects_v_version_indicators" USING btree ("_order");
  CREATE INDEX "_projects_v_version_indicators_parent_id_idx" ON "_projects_v_version_indicators" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_indicators_locale_idx" ON "_projects_v_version_indicators" USING btree ("_locale");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_links_locale_idx" ON "_projects_v_version_links" USING btree ("_locale");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_seo_version_seo_og_image_idx" ON "_projects_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_projects_v_version_version_created_by_idx" ON "_projects_v" USING btree ("version_created_by_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_domains_id_idx" ON "_projects_v_rels" USING btree ("domains_id");
  CREATE INDEX "_projects_v_rels_partners_id_idx" ON "_projects_v_rels" USING btree ("partners_id");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_rels_documents_id_idx" ON "_projects_v_rels" USING btree ("documents_id");
  CREATE INDEX "_projects_v_rels_news_id_idx" ON "_projects_v_rels" USING btree ("news_id");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_seo_seo_og_image_idx" ON "news" USING btree ("seo_og_image_id");
  CREATE INDEX "news_created_by_idx" ON "news" USING btree ("created_by_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_locales_parent_id_idx" ON "news_locales" USING btree ("_parent_id");
  CREATE INDEX "news_texts_order_parent" ON "news_texts" USING btree ("order","parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_projects_id_idx" ON "news_rels" USING btree ("projects_id");
  CREATE INDEX "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_version_published_at_idx" ON "_news_v" USING btree ("version_published_at");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_seo_version_seo_og_image_idx" ON "_news_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_news_v_version_version_created_by_idx" ON "_news_v" USING btree ("version_created_by_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_locales_parent_id_idx" ON "_news_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_v_texts_order_parent" ON "_news_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_projects_id_idx" ON "_news_v_rels" USING btree ("projects_id");
  CREATE INDEX "_news_v_rels_media_id_idx" ON "_news_v_rels" USING btree ("media_id");
  CREATE INDEX "publications_file_idx" ON "publications" USING btree ("file_id");
  CREATE INDEX "publications_cover_image_idx" ON "publications" USING btree ("cover_image_id");
  CREATE INDEX "publications_published_at_idx" ON "publications" USING btree ("published_at");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_seo_seo_og_image_idx" ON "publications" USING btree ("seo_og_image_id");
  CREATE INDEX "publications_created_by_idx" ON "publications" USING btree ("created_by_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE UNIQUE INDEX "publications_locales_locale_parent_id_unique" ON "publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "publications_locales_parent_id_idx" ON "publications_locales" USING btree ("_parent_id");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_projects_id_idx" ON "publications_rels" USING btree ("projects_id");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_file_idx" ON "_publications_v" USING btree ("version_file_id");
  CREATE INDEX "_publications_v_version_version_cover_image_idx" ON "_publications_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_publications_v_version_version_published_at_idx" ON "_publications_v" USING btree ("version_published_at");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_seo_version_seo_og_image_idx" ON "_publications_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_publications_v_version_version_created_by_idx" ON "_publications_v" USING btree ("version_created_by_id");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_snapshot_idx" ON "_publications_v" USING btree ("snapshot");
  CREATE INDEX "_publications_v_published_locale_idx" ON "_publications_v" USING btree ("published_locale");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE INDEX "_publications_v_autosave_idx" ON "_publications_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_publications_v_locales_locale_parent_id_unique" ON "_publications_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_locales_parent_id_idx" ON "_publications_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_publications_v_rels_order_idx" ON "_publications_v_rels" USING btree ("order");
  CREATE INDEX "_publications_v_rels_parent_idx" ON "_publications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_publications_v_rels_path_idx" ON "_publications_v_rels" USING btree ("path");
  CREATE INDEX "_publications_v_rels_projects_id_idx" ON "_publications_v_rels" USING btree ("projects_id");
  CREATE INDEX "events_start_date_idx" ON "events" USING btree ("start_date");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_related_news_idx" ON "events" USING btree ("related_news_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_seo_seo_og_image_idx" ON "events" USING btree ("seo_og_image_id");
  CREATE INDEX "events_created_by_idx" ON "events" USING btree ("created_by_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_locales_parent_id_idx" ON "events_locales" USING btree ("_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_start_date_idx" ON "_events_v" USING btree ("version_start_date");
  CREATE INDEX "_events_v_version_version_cover_image_idx" ON "_events_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_events_v_version_version_related_news_idx" ON "_events_v" USING btree ("version_related_news_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_seo_version_seo_og_image_idx" ON "_events_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_events_v_version_version_created_by_idx" ON "_events_v" USING btree ("version_created_by_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_locales_parent_id_idx" ON "_events_v_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs_created_by_idx" ON "faqs" USING btree ("created_by_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_created_by_idx" ON "_faqs_v" USING btree ("version_created_by_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_snapshot_idx" ON "_faqs_v" USING btree ("snapshot");
  CREATE INDEX "_faqs_v_published_locale_idx" ON "_faqs_v" USING btree ("published_locale");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "_faqs_v_autosave_idx" ON "_faqs_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_faqs_v_locales_locale_parent_id_unique" ON "_faqs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_faqs_v_locales_parent_id_idx" ON "_faqs_v_locales" USING btree ("_parent_id");
  CREATE INDEX "partners_collaboration_areas_order_idx" ON "partners_collaboration_areas" USING btree ("_order");
  CREATE INDEX "partners_collaboration_areas_parent_id_idx" ON "partners_collaboration_areas" USING btree ("_parent_id");
  CREATE INDEX "partners_collaboration_areas_locale_idx" ON "partners_collaboration_areas" USING btree ("_locale");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX "partners_slug_idx" ON "partners" USING btree ("slug");
  CREATE INDEX "partners_created_by_idx" ON "partners" USING btree ("created_by_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "partners__status_idx" ON "partners" USING btree ("_status");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_locales_parent_id_idx" ON "partners_locales" USING btree ("_parent_id");
  CREATE INDEX "_partners_v_version_collaboration_areas_order_idx" ON "_partners_v_version_collaboration_areas" USING btree ("_order");
  CREATE INDEX "_partners_v_version_collaboration_areas_parent_id_idx" ON "_partners_v_version_collaboration_areas" USING btree ("_parent_id");
  CREATE INDEX "_partners_v_version_collaboration_areas_locale_idx" ON "_partners_v_version_collaboration_areas" USING btree ("_locale");
  CREATE INDEX "_partners_v_parent_idx" ON "_partners_v" USING btree ("parent_id");
  CREATE INDEX "_partners_v_version_version_logo_idx" ON "_partners_v" USING btree ("version_logo_id");
  CREATE INDEX "_partners_v_version_version_slug_idx" ON "_partners_v" USING btree ("version_slug");
  CREATE INDEX "_partners_v_version_version_created_by_idx" ON "_partners_v" USING btree ("version_created_by_id");
  CREATE INDEX "_partners_v_version_version_updated_at_idx" ON "_partners_v" USING btree ("version_updated_at");
  CREATE INDEX "_partners_v_version_version_created_at_idx" ON "_partners_v" USING btree ("version_created_at");
  CREATE INDEX "_partners_v_version_version__status_idx" ON "_partners_v" USING btree ("version__status");
  CREATE INDEX "_partners_v_created_at_idx" ON "_partners_v" USING btree ("created_at");
  CREATE INDEX "_partners_v_updated_at_idx" ON "_partners_v" USING btree ("updated_at");
  CREATE INDEX "_partners_v_snapshot_idx" ON "_partners_v" USING btree ("snapshot");
  CREATE INDEX "_partners_v_published_locale_idx" ON "_partners_v" USING btree ("published_locale");
  CREATE INDEX "_partners_v_latest_idx" ON "_partners_v" USING btree ("latest");
  CREATE INDEX "_partners_v_autosave_idx" ON "_partners_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_partners_v_locales_locale_parent_id_unique" ON "_partners_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_partners_v_locales_parent_id_idx" ON "_partners_v_locales" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_created_by_idx" ON "team_members" USING btree ("created_by_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "team_members" USING btree ("_status");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_locales_parent_id_idx" ON "team_members_locales" USING btree ("_parent_id");
  CREATE INDEX "_team_members_v_parent_idx" ON "_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_version_created_by_idx" ON "_team_members_v" USING btree ("version_created_by_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_snapshot_idx" ON "_team_members_v" USING btree ("snapshot");
  CREATE INDEX "_team_members_v_published_locale_idx" ON "_team_members_v" USING btree ("published_locale");
  CREATE INDEX "_team_members_v_latest_idx" ON "_team_members_v" USING btree ("latest");
  CREATE INDEX "_team_members_v_autosave_idx" ON "_team_members_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_team_members_v_locales_locale_parent_id_unique" ON "_team_members_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_team_members_v_locales_parent_id_idx" ON "_team_members_v_locales" USING btree ("_parent_id");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_project_idx" ON "testimonials" USING btree ("project_id");
  CREATE INDEX "testimonials_created_by_idx" ON "testimonials" USING btree ("created_by_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials__status_idx" ON "testimonials" USING btree ("_status");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_locales_parent_id_idx" ON "testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_testimonials_v_parent_idx" ON "_testimonials_v" USING btree ("parent_id");
  CREATE INDEX "_testimonials_v_version_version_photo_idx" ON "_testimonials_v" USING btree ("version_photo_id");
  CREATE INDEX "_testimonials_v_version_version_project_idx" ON "_testimonials_v" USING btree ("version_project_id");
  CREATE INDEX "_testimonials_v_version_version_created_by_idx" ON "_testimonials_v" USING btree ("version_created_by_id");
  CREATE INDEX "_testimonials_v_version_version_updated_at_idx" ON "_testimonials_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimonials_v_version_version_created_at_idx" ON "_testimonials_v" USING btree ("version_created_at");
  CREATE INDEX "_testimonials_v_version_version__status_idx" ON "_testimonials_v" USING btree ("version__status");
  CREATE INDEX "_testimonials_v_created_at_idx" ON "_testimonials_v" USING btree ("created_at");
  CREATE INDEX "_testimonials_v_updated_at_idx" ON "_testimonials_v" USING btree ("updated_at");
  CREATE INDEX "_testimonials_v_snapshot_idx" ON "_testimonials_v" USING btree ("snapshot");
  CREATE INDEX "_testimonials_v_published_locale_idx" ON "_testimonials_v" USING btree ("published_locale");
  CREATE INDEX "_testimonials_v_latest_idx" ON "_testimonials_v" USING btree ("latest");
  CREATE INDEX "_testimonials_v_autosave_idx" ON "_testimonials_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_testimonials_v_locales_locale_parent_id_unique" ON "_testimonials_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_testimonials_v_locales_parent_id_idx" ON "_testimonials_v_locales" USING btree ("_parent_id");
  CREATE INDEX "impact_metrics_created_by_idx" ON "impact_metrics" USING btree ("created_by_id");
  CREATE INDEX "impact_metrics_updated_at_idx" ON "impact_metrics" USING btree ("updated_at");
  CREATE INDEX "impact_metrics_created_at_idx" ON "impact_metrics" USING btree ("created_at");
  CREATE INDEX "impact_metrics__status_idx" ON "impact_metrics" USING btree ("_status");
  CREATE UNIQUE INDEX "impact_metrics_locales_locale_parent_id_unique" ON "impact_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_metrics_locales_parent_id_idx" ON "impact_metrics_locales" USING btree ("_parent_id");
  CREATE INDEX "_impact_metrics_v_parent_idx" ON "_impact_metrics_v" USING btree ("parent_id");
  CREATE INDEX "_impact_metrics_v_version_version_created_by_idx" ON "_impact_metrics_v" USING btree ("version_created_by_id");
  CREATE INDEX "_impact_metrics_v_version_version_updated_at_idx" ON "_impact_metrics_v" USING btree ("version_updated_at");
  CREATE INDEX "_impact_metrics_v_version_version_created_at_idx" ON "_impact_metrics_v" USING btree ("version_created_at");
  CREATE INDEX "_impact_metrics_v_version_version__status_idx" ON "_impact_metrics_v" USING btree ("version__status");
  CREATE INDEX "_impact_metrics_v_created_at_idx" ON "_impact_metrics_v" USING btree ("created_at");
  CREATE INDEX "_impact_metrics_v_updated_at_idx" ON "_impact_metrics_v" USING btree ("updated_at");
  CREATE INDEX "_impact_metrics_v_snapshot_idx" ON "_impact_metrics_v" USING btree ("snapshot");
  CREATE INDEX "_impact_metrics_v_published_locale_idx" ON "_impact_metrics_v" USING btree ("published_locale");
  CREATE INDEX "_impact_metrics_v_latest_idx" ON "_impact_metrics_v" USING btree ("latest");
  CREATE INDEX "_impact_metrics_v_autosave_idx" ON "_impact_metrics_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_impact_metrics_v_locales_locale_parent_id_unique" ON "_impact_metrics_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_impact_metrics_v_locales_parent_id_idx" ON "_impact_metrics_v_locales" USING btree ("_parent_id");
  CREATE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX "documents_locales_locale_parent_id_unique" ON "documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "documents_locales_parent_id_idx" ON "documents_locales" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "partnership_requests_attachment_idx" ON "partnership_requests" USING btree ("attachment_id");
  CREATE INDEX "partnership_requests_updated_at_idx" ON "partnership_requests" USING btree ("updated_at");
  CREATE INDEX "partnership_requests_created_at_idx" ON "partnership_requests" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscriptions_email_idx" ON "newsletter_subscriptions" USING btree ("email");
  CREATE INDEX "newsletter_subscriptions_unsubscribe_token_idx" ON "newsletter_subscriptions" USING btree ("unsubscribe_token");
  CREATE INDEX "newsletter_subscriptions_updated_at_idx" ON "newsletter_subscriptions" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscriptions_created_at_idx" ON "newsletter_subscriptions" USING btree ("created_at");
  CREATE INDEX "submission_files_updated_at_idx" ON "submission_files" USING btree ("updated_at");
  CREATE INDEX "submission_files_created_at_idx" ON "submission_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "submission_files_filename_idx" ON "submission_files" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");
  CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity");
  CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_domains_id_idx" ON "payload_locked_documents_rels" USING btree ("domains_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_impact_metrics_id_idx" ON "payload_locked_documents_rels" USING btree ("impact_metrics_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_partnership_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("partnership_requests_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscriptions_i_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscriptions_id");
  CREATE INDEX "payload_locked_documents_rels_submission_files_id_idx" ON "payload_locked_documents_rels" USING btree ("submission_files_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_hero_hero_video_idx" ON "homepage" USING btree ("hero_video_id");
  CREATE INDEX "homepage_intro_intro_image_idx" ON "homepage" USING btree ("intro_image_id");
  CREATE INDEX "homepage_intro_intro_secondary_image_idx" ON "homepage" USING btree ("intro_secondary_image_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_locales_parent_id_idx" ON "homepage_locales" USING btree ("_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_media_id_idx" ON "homepage_rels" USING btree ("media_id");
  CREATE INDEX "_homepage_v_version_hero_version_hero_image_idx" ON "_homepage_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_homepage_v_version_hero_version_hero_video_idx" ON "_homepage_v" USING btree ("version_hero_video_id");
  CREATE INDEX "_homepage_v_version_intro_version_intro_image_idx" ON "_homepage_v" USING btree ("version_intro_image_id");
  CREATE INDEX "_homepage_v_version_intro_version_intro_secondary_image_idx" ON "_homepage_v" USING btree ("version_intro_secondary_image_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_homepage_v_locales_parent_id_idx" ON "_homepage_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_rels_order_idx" ON "_homepage_v_rels" USING btree ("order");
  CREATE INDEX "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" USING btree ("parent_id");
  CREATE INDEX "_homepage_v_rels_path_idx" ON "_homepage_v_rels" USING btree ("path");
  CREATE INDEX "_homepage_v_rels_media_id_idx" ON "_homepage_v_rels" USING btree ("media_id");
  CREATE INDEX "about_page_milestones_order_idx" ON "about_page_milestones" USING btree ("_order");
  CREATE INDEX "about_page_milestones_parent_id_idx" ON "about_page_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_milestones_locales_locale_parent_id_unique" ON "about_page_milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_milestones_locales_parent_id_idx" ON "about_page_milestones_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_values_locales_locale_parent_id_unique" ON "about_page_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_values_locales_parent_id_idx" ON "about_page_values_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_commitments_order_idx" ON "about_page_commitments" USING btree ("_order");
  CREATE INDEX "about_page_commitments_parent_id_idx" ON "about_page_commitments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_commitments_locales_locale_parent_id_unique" ON "about_page_commitments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_commitments_locales_parent_id_idx" ON "about_page_commitments_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_presentation_image_idx" ON "about_page" USING btree ("presentation_image_id");
  CREATE INDEX "about_page_president_message_president_message_author_idx" ON "about_page" USING btree ("president_message_author_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_locales_parent_id_idx" ON "about_page_locales" USING btree ("_parent_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_documents_id_idx" ON "about_page_rels" USING btree ("documents_id");
  CREATE INDEX "_about_page_v_version_milestones_order_idx" ON "_about_page_v_version_milestones" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_milestones_parent_id_idx" ON "_about_page_v_version_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_milestones_locales_locale_parent_id_un" ON "_about_page_v_version_milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_milestones_locales_parent_id_idx" ON "_about_page_v_version_milestones_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_values_order_idx" ON "_about_page_v_version_values" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_parent_id_idx" ON "_about_page_v_version_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_values_locales_locale_parent_id_unique" ON "_about_page_v_version_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_values_locales_parent_id_idx" ON "_about_page_v_version_values_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_commitments_order_idx" ON "_about_page_v_version_commitments" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_commitments_parent_id_idx" ON "_about_page_v_version_commitments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_about_page_v_version_commitments_locales_locale_parent_id_u" ON "_about_page_v_version_commitments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_commitments_locales_parent_id_idx" ON "_about_page_v_version_commitments_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_version_presentation_image_idx" ON "_about_page_v" USING btree ("version_presentation_image_id");
  CREATE INDEX "_about_page_v_version_president_message_version_presiden_idx" ON "_about_page_v" USING btree ("version_president_message_author_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_about_page_v_locales_locale_parent_id_unique" ON "_about_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_locales_parent_id_idx" ON "_about_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_rels_order_idx" ON "_about_page_v_rels" USING btree ("order");
  CREATE INDEX "_about_page_v_rels_parent_idx" ON "_about_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_about_page_v_rels_path_idx" ON "_about_page_v_rels" USING btree ("path");
  CREATE INDEX "_about_page_v_rels_documents_id_idx" ON "_about_page_v_rels" USING btree ("documents_id");
  CREATE INDEX "saagdo_page_problems_order_idx" ON "saagdo_page_problems" USING btree ("_order");
  CREATE INDEX "saagdo_page_problems_parent_id_idx" ON "saagdo_page_problems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "saagdo_page_problems_locales_locale_parent_id_unique" ON "saagdo_page_problems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "saagdo_page_problems_locales_parent_id_idx" ON "saagdo_page_problems_locales" USING btree ("_parent_id");
  CREATE INDEX "saagdo_page_components_order_idx" ON "saagdo_page_components" USING btree ("_order");
  CREATE INDEX "saagdo_page_components_parent_id_idx" ON "saagdo_page_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "saagdo_page_components_locales_locale_parent_id_unique" ON "saagdo_page_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "saagdo_page_components_locales_parent_id_idx" ON "saagdo_page_components_locales" USING btree ("_parent_id");
  CREATE INDEX "saagdo_page_flow_order_idx" ON "saagdo_page_flow" USING btree ("_order");
  CREATE INDEX "saagdo_page_flow_parent_id_idx" ON "saagdo_page_flow" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "saagdo_page_flow_locales_locale_parent_id_unique" ON "saagdo_page_flow_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "saagdo_page_flow_locales_parent_id_idx" ON "saagdo_page_flow_locales" USING btree ("_parent_id");
  CREATE INDEX "saagdo_page_hero_hero_image_idx" ON "saagdo_page" USING btree ("hero_image_id");
  CREATE INDEX "saagdo_page__status_idx" ON "saagdo_page" USING btree ("_status");
  CREATE UNIQUE INDEX "saagdo_page_locales_locale_parent_id_unique" ON "saagdo_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "saagdo_page_locales_parent_id_idx" ON "saagdo_page_locales" USING btree ("_parent_id");
  CREATE INDEX "_saagdo_page_v_version_problems_order_idx" ON "_saagdo_page_v_version_problems" USING btree ("_order");
  CREATE INDEX "_saagdo_page_v_version_problems_parent_id_idx" ON "_saagdo_page_v_version_problems" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_saagdo_page_v_version_problems_locales_locale_parent_id_uni" ON "_saagdo_page_v_version_problems_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_saagdo_page_v_version_problems_locales_parent_id_idx" ON "_saagdo_page_v_version_problems_locales" USING btree ("_parent_id");
  CREATE INDEX "_saagdo_page_v_version_components_order_idx" ON "_saagdo_page_v_version_components" USING btree ("_order");
  CREATE INDEX "_saagdo_page_v_version_components_parent_id_idx" ON "_saagdo_page_v_version_components" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_saagdo_page_v_version_components_locales_locale_parent_id_u" ON "_saagdo_page_v_version_components_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_saagdo_page_v_version_components_locales_parent_id_idx" ON "_saagdo_page_v_version_components_locales" USING btree ("_parent_id");
  CREATE INDEX "_saagdo_page_v_version_flow_order_idx" ON "_saagdo_page_v_version_flow" USING btree ("_order");
  CREATE INDEX "_saagdo_page_v_version_flow_parent_id_idx" ON "_saagdo_page_v_version_flow" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_saagdo_page_v_version_flow_locales_locale_parent_id_unique" ON "_saagdo_page_v_version_flow_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_saagdo_page_v_version_flow_locales_parent_id_idx" ON "_saagdo_page_v_version_flow_locales" USING btree ("_parent_id");
  CREATE INDEX "_saagdo_page_v_version_hero_version_hero_image_idx" ON "_saagdo_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_saagdo_page_v_version_version__status_idx" ON "_saagdo_page_v" USING btree ("version__status");
  CREATE INDEX "_saagdo_page_v_created_at_idx" ON "_saagdo_page_v" USING btree ("created_at");
  CREATE INDEX "_saagdo_page_v_updated_at_idx" ON "_saagdo_page_v" USING btree ("updated_at");
  CREATE INDEX "_saagdo_page_v_snapshot_idx" ON "_saagdo_page_v" USING btree ("snapshot");
  CREATE INDEX "_saagdo_page_v_published_locale_idx" ON "_saagdo_page_v" USING btree ("published_locale");
  CREATE INDEX "_saagdo_page_v_latest_idx" ON "_saagdo_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_saagdo_page_v_locales_locale_parent_id_unique" ON "_saagdo_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_saagdo_page_v_locales_parent_id_idx" ON "_saagdo_page_v_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_texts_order_parent" ON "site_settings_texts" USING btree ("order","parent_id");
  CREATE INDEX "navigation_header_children_order_idx" ON "navigation_header_children" USING btree ("_order");
  CREATE INDEX "navigation_header_children_parent_id_idx" ON "navigation_header_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_header_children_locales_locale_parent_id_unique" ON "navigation_header_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_header_children_locales_parent_id_idx" ON "navigation_header_children_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_order_idx" ON "navigation_header" USING btree ("_order");
  CREATE INDEX "navigation_header_parent_id_idx" ON "navigation_header" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_header_locales_locale_parent_id_unique" ON "navigation_header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_header_locales_parent_id_idx" ON "navigation_header_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_columns_links_locales_locale_parent_id_uni" ON "navigation_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_columns_links_locales_parent_id_idx" ON "navigation_footer_columns_links_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_columns_locales_locale_parent_id_unique" ON "navigation_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_columns_locales_parent_id_idx" ON "navigation_footer_columns_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "domains_focus_points" CASCADE;
  DROP TABLE "domains" CASCADE;
  DROP TABLE "domains_locales" CASCADE;
  DROP TABLE "_domains_v_version_focus_points" CASCADE;
  DROP TABLE "_domains_v" CASCADE;
  DROP TABLE "_domains_v_locales" CASCADE;
  DROP TABLE "projects_objectives" CASCADE;
  DROP TABLE "projects_activities" CASCADE;
  DROP TABLE "projects_achievements" CASCADE;
  DROP TABLE "projects_indicators" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_objectives" CASCADE;
  DROP TABLE "_projects_v_version_activities" CASCADE;
  DROP TABLE "_projects_v_version_achievements" CASCADE;
  DROP TABLE "_projects_v_version_indicators" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_texts" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_texts" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_locales" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "_publications_v_locales" CASCADE;
  DROP TABLE "_publications_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "_faqs_v_locales" CASCADE;
  DROP TABLE "partners_collaboration_areas" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "_partners_v_version_collaboration_areas" CASCADE;
  DROP TABLE "_partners_v" CASCADE;
  DROP TABLE "_partners_v_locales" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "_team_members_v" CASCADE;
  DROP TABLE "_team_members_v_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "_testimonials_v" CASCADE;
  DROP TABLE "_testimonials_v_locales" CASCADE;
  DROP TABLE "impact_metrics" CASCADE;
  DROP TABLE "impact_metrics_locales" CASCADE;
  DROP TABLE "_impact_metrics_v" CASCADE;
  DROP TABLE "_impact_metrics_v_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "documents_locales" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "partnership_requests" CASCADE;
  DROP TABLE "newsletter_subscriptions" CASCADE;
  DROP TABLE "submission_files" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_locales" CASCADE;
  DROP TABLE "_homepage_v_rels" CASCADE;
  DROP TABLE "about_page_milestones" CASCADE;
  DROP TABLE "about_page_milestones_locales" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page_values_locales" CASCADE;
  DROP TABLE "about_page_commitments" CASCADE;
  DROP TABLE "about_page_commitments_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  DROP TABLE "_about_page_v_version_milestones" CASCADE;
  DROP TABLE "_about_page_v_version_milestones_locales" CASCADE;
  DROP TABLE "_about_page_v_version_values" CASCADE;
  DROP TABLE "_about_page_v_version_values_locales" CASCADE;
  DROP TABLE "_about_page_v_version_commitments" CASCADE;
  DROP TABLE "_about_page_v_version_commitments_locales" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_about_page_v_locales" CASCADE;
  DROP TABLE "_about_page_v_rels" CASCADE;
  DROP TABLE "saagdo_page_problems" CASCADE;
  DROP TABLE "saagdo_page_problems_locales" CASCADE;
  DROP TABLE "saagdo_page_components" CASCADE;
  DROP TABLE "saagdo_page_components_locales" CASCADE;
  DROP TABLE "saagdo_page_flow" CASCADE;
  DROP TABLE "saagdo_page_flow_locales" CASCADE;
  DROP TABLE "saagdo_page" CASCADE;
  DROP TABLE "saagdo_page_locales" CASCADE;
  DROP TABLE "_saagdo_page_v_version_problems" CASCADE;
  DROP TABLE "_saagdo_page_v_version_problems_locales" CASCADE;
  DROP TABLE "_saagdo_page_v_version_components" CASCADE;
  DROP TABLE "_saagdo_page_v_version_components_locales" CASCADE;
  DROP TABLE "_saagdo_page_v_version_flow" CASCADE;
  DROP TABLE "_saagdo_page_v_version_flow_locales" CASCADE;
  DROP TABLE "_saagdo_page_v" CASCADE;
  DROP TABLE "_saagdo_page_v_locales" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "site_settings_texts" CASCADE;
  DROP TABLE "navigation_header_children" CASCADE;
  DROP TABLE "navigation_header_children_locales" CASCADE;
  DROP TABLE "navigation_header" CASCADE;
  DROP TABLE "navigation_header_locales" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns_links_locales" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation_footer_columns_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "payload_jobs_stats" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_review_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_review_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_domains_icon";
  DROP TYPE "public"."enum_domains_review_status";
  DROP TYPE "public"."enum_domains_status";
  DROP TYPE "public"."enum__domains_v_version_icon";
  DROP TYPE "public"."enum__domains_v_version_review_status";
  DROP TYPE "public"."enum__domains_v_version_status";
  DROP TYPE "public"."enum__domains_v_published_locale";
  DROP TYPE "public"."enum_projects_project_status";
  DROP TYPE "public"."enum_projects_location_scope";
  DROP TYPE "public"."enum_projects_review_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_location_scope";
  DROP TYPE "public"."enum__projects_v_version_review_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_review_status";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_review_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_publications_type";
  DROP TYPE "public"."enum_publications_document_language";
  DROP TYPE "public"."enum_publications_review_status";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_type";
  DROP TYPE "public"."enum__publications_v_version_document_language";
  DROP TYPE "public"."enum__publications_v_version_review_status";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum__publications_v_published_locale";
  DROP TYPE "public"."enum_events_format";
  DROP TYPE "public"."enum_events_review_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_format";
  DROP TYPE "public"."enum__events_v_version_review_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_faqs_scope";
  DROP TYPE "public"."enum_faqs_review_status";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_scope";
  DROP TYPE "public"."enum__faqs_v_version_review_status";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum__faqs_v_published_locale";
  DROP TYPE "public"."enum_partners_category";
  DROP TYPE "public"."enum_partners_review_status";
  DROP TYPE "public"."enum_partners_status";
  DROP TYPE "public"."enum__partners_v_version_category";
  DROP TYPE "public"."enum__partners_v_version_review_status";
  DROP TYPE "public"."enum__partners_v_version_status";
  DROP TYPE "public"."enum__partners_v_published_locale";
  DROP TYPE "public"."enum_team_members_group";
  DROP TYPE "public"."enum_team_members_review_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum__team_members_v_version_group";
  DROP TYPE "public"."enum__team_members_v_version_review_status";
  DROP TYPE "public"."enum__team_members_v_version_status";
  DROP TYPE "public"."enum__team_members_v_published_locale";
  DROP TYPE "public"."enum_testimonials_review_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum__testimonials_v_version_review_status";
  DROP TYPE "public"."enum__testimonials_v_version_status";
  DROP TYPE "public"."enum__testimonials_v_published_locale";
  DROP TYPE "public"."enum_impact_metrics_icon";
  DROP TYPE "public"."enum_impact_metrics_review_status";
  DROP TYPE "public"."enum_impact_metrics_status";
  DROP TYPE "public"."enum__impact_metrics_v_version_icon";
  DROP TYPE "public"."enum__impact_metrics_v_version_review_status";
  DROP TYPE "public"."enum__impact_metrics_v_version_status";
  DROP TYPE "public"."enum__impact_metrics_v_published_locale";
  DROP TYPE "public"."enum_media_provenance";
  DROP TYPE "public"."enum_contact_submissions_subject";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_contact_submissions_notification";
  DROP TYPE "public"."enum_partnership_requests_collaboration_type";
  DROP TYPE "public"."enum_partnership_requests_status";
  DROP TYPE "public"."enum_partnership_requests_notification";
  DROP TYPE "public"."enum_newsletter_subscriptions_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_audit_logs_action";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum__homepage_v_published_locale";
  DROP TYPE "public"."enum_about_page_milestones_date_precision";
  DROP TYPE "public"."enum_about_page_values_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_milestones_date_precision";
  DROP TYPE "public"."enum__about_page_v_version_values_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_saagdo_page_problems_icon";
  DROP TYPE "public"."enum_saagdo_page_components_icon";
  DROP TYPE "public"."enum_saagdo_page_flow_icon";
  DROP TYPE "public"."enum_saagdo_page_status";
  DROP TYPE "public"."enum__saagdo_page_v_version_problems_icon";
  DROP TYPE "public"."enum__saagdo_page_v_version_components_icon";
  DROP TYPE "public"."enum__saagdo_page_v_version_flow_icon";
  DROP TYPE "public"."enum__saagdo_page_v_version_status";
  DROP TYPE "public"."enum__saagdo_page_v_published_locale";
  DROP TYPE "public"."enum_site_settings_socials_platform";
  DROP TYPE "public"."enum_navigation_header_children_route";
  DROP TYPE "public"."enum_navigation_header_route";
  DROP TYPE "public"."enum_navigation_footer_columns_links_route";`)
}
