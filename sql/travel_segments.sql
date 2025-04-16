--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4

-- Started on 2025-04-16 14:13:37

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

--
-- TOC entry 3401 (class 0 OID 47382)
-- Dependencies: 229
-- Data for Name: travel_segments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (1, '國五蘇澳端至蘇花改蘇澳端(經台9)', 24.616921554221175, 121.8263526615977, 24.59421496962456, 121.84603664533203, 'S', 392, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (2, '台9線(蘇澳端-永樂高架橋)', 24.59421496962456, 121.84603664533203, 24.57115898703884, 121.84773490232742, 'S', 160, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (3, '台9線(永樂高架橋-東澳端)', 24.57115898703884, 121.84773490232742, 24.51686964192245, 121.830071445189, 'S', 366, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (4, '國五蘇澳端至蘇花改蘇澳端(經台2)', 24.616921554221175, 121.8263526615977, 24.594306434565638, 121.84627965124746, 'S', 457, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (5, '台9線(東澳端-南澳管制站)', 24.51686964192245, 121.830071445189, 24.46710730411189, 121.80588195285738, 'S', 893, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (6, '台9線(南澳管制站-武塔高架橋)', 24.46710730411189, 121.80588195285738, 24.451150510491903, 121.77735187662219, 'S', 263, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (7, '台9線(武塔高架橋-漢本高架橋)', 24.451150510491903, 121.77735187662219, 24.319787169337822, 121.76429010207838, 'S', 874, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (8, '台9線(武塔高架橋- 和平地磅站)', 24.319787169337822, 121.76429010207838, 24.312429403612562, 121.7534499218295, 'S', 93, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (9, '台9線(和平地磅站-和工五路口)', 24.312429403612562, 121.7534499218295, 24.29828915461192, 121.75226762394894, 'S', 182, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (11, '台9線(和工五路-C1和中端)', 24.29828915461192, 121.75226762394894, 24.28084973563794, 121.74611406650934, 'S', 121, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (12, '台9線(C1和中端-和仁端)', 24.28084973563794, 121.74611406650934, 24.246285718346144, 121.71390164552604, 'S', 326, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (13, '台9線(和仁-大清水)', 24.246285718346144, 121.71390164552604, 24.216220500050635, 121.68733222946659, 'S', 344, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (14, '台9線(大清水-太魯閣大橋北端)', 24.246285718346144, 121.71390164552604, 24.149765323628497, 121.64427815168085, 'S', 1329, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (15, '台9線(太魯閣大橋北端-花蓮市區)', 24.149765323628497, 121.64427815168085, 23.980476071621293, 121.6122279392295, 'S', 2193, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (19, '台9線(花蓮市區-太魯閣大橋北端)', 23.980006766299905, 121.61160671726098, 24.14962382324107, 121.64437303501671, 'N', 1831, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (20, '台9線(太魯閣大橋北端-崇德休憩區)', 24.14962382324107, 121.64437303501671, 24.19196910927952, 121.66125791215346, 'N', 436, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (21, '台9線(崇德休憩區-大清水)', 24.19196910927952, 121.66125791215346, 24.21644185856558, 121.6874600453684, 'N', 534, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (22, '台9線(大清水-和仁)', 24.21644185856558, 121.6874600453684, 24.247402190230144, 121.71464162440626, 'N', 360, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (23, '台9線(C1段和仁端-和中端)', 24.247402190230144, 121.71464162440626, 24.281597349028853, 121.74650697481685, 'N', 710, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (24, '台9線(C1段和中端-和工五路)', 24.281597349028853, 121.74650697481685, 24.298300403866033, 121.7520442542801, 'N', 414, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (25, '台9線(和工五路-和平地磅站', 24.298300403866033, 121.7520442542801, 24.31234912432104, 121.75366886514155, 'N', 153, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (26, '台9線(和平地磅站-漢本高架橋)', 24.31234912432104, 121.75366886514155, 24.320302407015575, 121.76459403268345, 'N', 94, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (27, '台9線(漢本高架橋-武塔高架橋)', 24.320302407015575, 121.76459403268345, 24.451398108740896, 121.77750973333657, 'N', 872, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (28, '台9線(武塔高架橋-南澳管制站)', 24.451398108740896, 121.77750973333657, 24.466971221748505, 121.80567062110175, 'N', 297, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (29, '台9線(南澳管制站-東澳端)', 24.466971221748505, 121.80567062110175, 24.516988979705154, 121.83010512288894, 'N', 906, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (30, '台9線(東澳端-永樂高架橋)', 24.516988979705154, 121.83010512288894, 24.57111099761484, 121.8478558445852, 'N', 381, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (31, '台9線(永樂高架橋-蘇澳)', 24.57111099761484, 121.8478558445852, 24.594172582725406, 121.84623225355801, 'N', 167, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (33, '台9丁線(和平車站-南澳車站)', 24.297775330118547, 121.75249045275307, 24.464585648604434, 121.80057713371467, 'N', 1364, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (34, '台9丁線(東澳端-蘇澳箕山橋)', 24.464585648604434, 121.80057713371467, 24.596400319117805, 121.83639466785341, 'N', 1708, '2024-12-26 09:27:22.413', NULL, NULL);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (10, '台9線大客車替代道路(克尼布東路口-和工五路)', 24.312429403612562, 121.7534499218295, 24.29828915461192, 121.75226762394894, 'S', 442, '2024-12-26 09:27:22.413', 24.312498926784457, 121.7548962057353);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (16, '台9丁線(蘇澳箕山橋-東澳端)', 24.596333699489378, 121.83631148915379, 24.51686964192245, 121.830071445189, 'S', 1809, '2024-12-26 09:27:22.413', 24.56470518484436, 121.8667709491855);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (17, '台9丁線(南澳車站-和平車站)', 24.464620706931125, 121.80065877258275, 24.29828915461192, 121.75226762394894, 'S', 2190, '2024-12-26 09:27:22.413', 24.36761414347873, 121.77486524046007);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (18, '台9丁線(和平車站-大清水)', 24.298544520705004, 121.75309809605089, 24.216220500050635, 121.68733222946659, 'S', 1097, '2024-12-26 09:27:22.413', 24.256419137607505, 121.73733971659261);
INSERT INTO public.travel_segments (id, name, "startX", "startY", "endX", "endY", direction, "travelTime", "createdAt", "middleX", "middleY") VALUES (32, '台9丁線(大清水-和平車站)', 24.218923101674807, 121.68893191728915, 24.297775330118547, 121.75249045275307, 'N', 1005, '2024-12-26 09:27:22.413', 24.258278, 121.738131);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 228
-- Name: travel_segments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.travel_segments_id_seq', 34, true);


-- Completed on 2025-04-16 14:13:37

--
-- PostgreSQL database dump complete
--

