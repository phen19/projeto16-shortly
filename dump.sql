--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "visitCount" integer DEFAULT 0
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "userId", "shortUrl", url, "createdAt", "visitCount") FROM stdin;
19	4	XMVR9SjO	https://pelando.com.br	2022-08-05 19:29:27.157508	0
23	6	ZH2ZrLZt	https://www.ofertaesperta.com/	2022-08-05 22:04:42.431027	1
24	1	E5mbsnAL	https://driven.com.br	2022-08-06 10:13:42.841337	0
9	2	Pc-RGMet	http://driven.com.br	2022-08-04 15:56:24.666524	4
26	1	w6G8HjDy	https://pelando.com.br	2022-08-06 10:16:26.665007	0
27	5	ZIN7l048	https://pelando.com.br	2022-08-06 10:17:50.567079	0
14	1	dXQzb-ug	https://driven.com.br	2022-08-05 16:35:34.746263	6
1	1	wuqbGDiK	https://google.com	2022-08-04 14:46:01.485754	14
12	3	_oGo5ky4	http://google.com	2022-08-04 18:17:43.755924	4
11	1	-4S6AaR2	http://netvasco.com.br	2022-08-04 18:11:18.998797	7
17	1	44CU3eKr	https://espn.com.br	2022-08-05 16:39:35.638174	9
15	1	gggTw0VF	https://ofertaesperta.com.br	2022-08-05 16:37:28.945731	3
18	1	fj8o2Lyh	http://pwc.com.br	2022-08-05 16:40:19.338858	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	João	joao@driven.com.br	$2b$10$NOVsLU1WElR.XNlpxP.teeVqo7zVvNCrleiSKeAsBOO.sr2BVQn9y	2022-08-04 14:44:03.948729
2	Pedro	pedro@driven.com.br	$2b$10$Gt24F77yAd/oVjGNop85weiGwhifXW6kmaXLT7eJGMqidiVkKeWBy	2022-08-04 15:26:22.719986
3	Melissa	melissa@driven.com.br	$2b$10$A.PTng0tgQ311As32uOgce0iuDTleIGEtlQbq9jp2Nv507rWbZaYq	2022-08-04 18:16:58.31146
4	Cintia	cintia@gmail.com	$2b$10$QdcxXGz88ZT4XWOP5a9M7el6VmXGZoyt1cr2hmhSKogYK0gKnN6Fy	2022-08-05 19:28:57.329767
5	Lele	lele@lele.com	$2b$10$UfGMfWXln8NhopTzejud8e.Xvx2j8D2EP53oZeHxK5esN5qSrwEPK	2022-08-05 21:51:48.108532
6	cintia	cintiabal@gmail.com	$2b$10$.XECQYvPN.fwpl61oNtUYOeDiMMRe4uKHDnYZRsdzy3kIIYsQQGZO	2022-08-05 22:02:30.004305
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 27, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

