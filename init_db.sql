/*
Bootstrap a Postgres database named wundergraph to store API registration data.
*/

-- Build user
create database wundergraph;
create user wg with password 'changeme';
grant all privileges on schema public to wg;

create table public.org (
    org_id serial primary key,
    org_name text,
    wg_org_id text
);
grant select on public.org to wg;

create table public.org_user (
    user_id serial primary key ,
    org_id int references public.org(org_id),
    forename text,
    surname text,
    title text,
    department text,
    phone text,
    email text,
    image_url text,
    description text
);
grant select, update, insert, delete on public.org_user to wg;

create table public.api (
    api_id serial,
    api_name text,
    federated_graph_id text,
    description text,
    owner_id int references public.org_user(user_id)
);

alter table public.api
    add constraint api_pk
        primary key (federated_graph_id, api_name);

create unique index api_wg_api_id_uindex
    on public.api (api_name);

grant select, update, insert, delete on public.api to wg;
grant all privileges on api_api_id_seq to wg;

create table api_access
(
    federated_graph_id text ,
    api_name       text ,
    operation_id   text,
    operation_name text,
    duration       double precision,
    access_time    timestamp with time zone default localtimestamp
);

create unique index api_access_api_id_uindex
    on public.api_access (api_name, operation_id);

grant select, insert, update on api_access to wg;

create table application
(
    app_id      serial
        constraint application_pk primary key,
    app_name    text,
    owner_id    integer,
    description text
);

grant select, insert, update on application to wg;
grant all privileges on application_app_id_seq to wg;

create table dependency
(
    dependency_id serial,
    api_id int,
    app_id int,
    constraint dependency_pk primary key (api_id, app_id),
    added_on timestamptz default localtimestamp
);

grant select, insert, update on dependency to wg;
grant all privileges on dependency_dependency_id_seq to wg;
