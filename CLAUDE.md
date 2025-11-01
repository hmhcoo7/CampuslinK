# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CampuslinK - 광운대학교 학생들을 위한 학습 모임 매칭 플랫폼

## Getting Started

This is a new project repository. The codebase structure and development commands will be documented here as the project develops.

## Architecture

To be documented as the project architecture is established.

---

## 홈화면 기능 명세

### 1. 캘린더 (왼쪽)

**기능 개요:**
- 사용자가 신청한 앞으로 다가올 모임들의 일정을 시각적으로 표시

**세부 기능:**
- **월 이동**: 좌/우 화살표 버튼으로 이전/다음 달 이동
- **모임 날짜 표시**: 신청한 모임이 있는 날짜에 **빨간 점** 표시
- **날짜 클릭 시 팝업**:
  - 빨간 점이 있는 날짜를 클릭하면 팝업창 표시
  - 팝업 내용: 모임 이름, 날짜, 장소, 모집 상태(모집중/마감)
- **현재 시간 표시**: 캘린더 하단에 실시간 시간 표시

**데이터 요구사항:**
- 모임 날짜 정보 (예정 모임만)
- 모임 기본 정보 (이름, 날짜, 시간, 장소, 모집 상태)

---

### 2. 다가올 일정 (오른쪽 상단)

**기능 개요:**
- 오늘 이후의 모임을 시간순으로 표시

**세부 기능:**
- **정렬**: 모임 예정 시간 기준 **오름차순** (가까운 순서대로)
- **모임 카드 구성**:
  - 모임 이름 (제목)
  - 📅 날짜/시간
  - 📍 장소
  - 📋 상태 (모집중/마감)
  - **신청하기 버튼**: 모임 신청 기능 (향후 구현)

**데이터 요구사항:**
- 현재 날짜/시간 이후의 모임만 필터링
- 모임 정보: 제목, 날짜, 시작시간, 종료시간, 장소, 모집상태

---

### 3. 과거 신청 내역 (오른쪽 하단)

**기능 개요:**
- 이미 지나간 모임 중 사용자가 신청했던 모임 표시

**세부 기능:**
- **정렬**: 모임 시간 기준 **내림차순** (최근 것부터)
- **모임 카드 구성**:
  - 모임 이름 (제목)
  - 📅 날짜/시간
  - 📍 장소
  - 📋 상태 (마감)
  - **하트 버튼**: 좋아요 기능

**하트 버튼 기능:**
- **초기 상태**:
  - 배경색: 흰색 (#FFFFFF)
  - 하트 색상: 검은색
  - 테두리: 검은색 (#2C2C2C)
- **클릭 후 상태**:
  - 배경색: 검은색 (#2C2C2C)
  - 하트 색상: 흰색
  - 테두리: 검은색 (#2C2C2C)
- **토글 동작**: 클릭할 때마다 상태 전환
- **데이터 연동**:
  - 좋아요 수는 회원 프로필 페이지에 표시
  - 사용자의 좋아요 누적 개수 추적

**데이터 요구사항:**
- 현재 날짜/시간 이전의 모임만 필터링
- 사용자가 신청한 모임만 표시
- 좋아요 상태 저장 (user_id, meeting_id, liked)

---

### 4. 알림 기능 (헤더)

**기능 개요:**
- 모임 관련 변경사항 및 참여자 알림

**알림 트리거:**
1. 신청한 모임 정보 변경 (날짜, 시간, 장소 등)
2. 생성한 모임에 새로운 참여자 참여
3. 신청한 모임의 승인/거절
4. 모임 마감 알림

**향후 구현 필요:**
- 알림 목록 페이지
- 읽음/안읽음 상태 관리
- 실시간 알림 (WebSocket or Polling)

---

## 데이터 모델 (예상)

### 모임 (meetings)
- id, title, description, category, date, start_time, end_time, location
- status (모집중/마감), max_members, current_members
- created_by, created_at

### 모임 참여자 (meeting_participants)
- id, meeting_id, user_id, status (pending/approved/rejected)
- joined_at

### 좋아요 (meeting_likes)
- id, meeting_id, user_id, liked_at

### 알림 (notifications)
- id, user_id, meeting_id, type, message, is_read, created_at

---

## 향후 구현 우선순위

1. 모임 생성/관리 기능
2. 캘린더 날짜 클릭 팝업
3. 다가올 일정 실제 데이터 연동
4. 과거 신청 내역 실제 데이터 연동
5. 하트 기능 데이터베이스 연동
6. 알림 시스템 구현
