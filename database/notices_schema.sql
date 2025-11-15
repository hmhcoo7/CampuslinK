-- 공지사항 테이블 생성
CREATE TABLE IF NOT EXISTS 공지사항 (
  id SERIAL PRIMARY KEY,
  번호 INTEGER,
  제목 TEXT NOT NULL,
  내용 TEXT,
  작성자_email TEXT NOT NULL REFERENCES 회원(email) ON DELETE CASCADE,
  작성자 TEXT NOT NULL,
  작성일 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  조회수 INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_공지사항_pinned ON 공지사항(is_pinned, 번호 DESC);
CREATE INDEX idx_공지사항_번호 ON 공지사항(번호 DESC);

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO 공지사항 (번호, 제목, 내용, 작성자_email, 작성자, 조회수, is_pinned, 작성일) VALUES
(NULL, '2025-2학기 창발설계학기(학생주도형) 역량 강화 워크숍 참여 안내', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 169, true, '2025-11-12'),
(NULL, '2025-2학기 창발설계학기(학생주도형) 각종 서식 공유', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 569, true, '2025-09-02'),
(NULL, '★중요★ 창발설계학기! 카카오톡 채널 활용 안내(1:1 채팅 가능)', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 1653, true, '2024-09-10'),
(NULL, '★긴급공지★ 사이드 오류 사항 조치방법 안내(엑셀, 크롬 가능)', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 2036, true, '2023-12-12'),
(NULL, '★중요★ 창발설계학기! 담당자 연락처', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 2881, true, '2022-12-30'),
(267, '2025학년도 2학기 창발설계학기! 지원팀! 2차 정산(11/3(월)~11/5(수)) ※ 기한 엄수 요망', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 265, false, '2025-10-29'),
(266, '2025학년도 2학기 창발설계학기! 각 팀별 프로젝트 주제 및 최종 산출물 변경 신청 마감 안...', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 594, false, '2025-10-24'),
(265, '★중요★ 2025학년도 2학기 창발설계학기! 8주차 중간보고서 제출 안내(~10/26일까지)', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 330, false, '2025-10-23'),
(264, '[긴급공지] 변인카드 해외 구매건 관련 지도교수님 등이 절차 안내', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 378, false, '2025-09-30'),
(263, '2025학년도 2학기 창발설계학기! 지원팀! 1차 정산(10/1(월)~10/13(일)) ※ 기한 엄수 요망', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 546, false, '2025-09-29'),
(262, '2025-2 창발설계학기! 지원팀! 집행 계획서 출결표 제출 안내(~9/3(수))', '공지사항 내용입니다.', 'admin@kw.ac.kr', '운영자', 837, false, '2025-08-28');
