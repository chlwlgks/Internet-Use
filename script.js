// 개인정보와 프로젝트 설명은 아래 데이터와 index.html에서 수정할 수 있습니다.
const projects = {
  lumotion: {
    label: '01 / iOS APPLICATION', title: 'Lumotion', intro: 'HDR 사진의 빛과 색을 영상으로 이어 가는 iOS 앱.',
    sections: [
      ['프로젝트 소개', 'HDR 사진을 HLG 영상으로 변환하는 앱입니다. 사진의 원본 해상도와 HDR 표현을 유지하는 변환 흐름을 다룹니다.'],
      ['구현하며 고민한 것', ['SwiftUI를 이용한 사진 선택, 변환, 저장 흐름 구성', '한 장의 프레임을 5초 동안 표시하는 영상 인코딩', '원본 해상도 보존, 취소 처리와 임시 파일 정리', 'HDR 메타데이터와 어두운 영역의 표현 차이 검토']],
      ['개발 기록', '변환 로직과 작업 수명주기를 정리하며 개선했습니다. 실제 iPhone에서의 색 표현, 저장 및 공유 동작은 추가 검증이 필요한 부분입니다.'],
      ['사용 기술', 'Swift · SwiftUI · AVFoundation · Core Image']
    ]
  },
  quitly: {
    label: '02 / macOS UTILITY', title: 'Quitly', intro: '마지막 창을 닫은 다음, 앱 정리까지 돕는 메뉴 막대 도구.',
    sections: [
      ['프로젝트 소개', '창을 닫아도 실행 중으로 남는 macOS 앱을 정리하기 위해 만든 유틸리티입니다. 사용자가 선택한 앱에 대해 마지막 창이 닫힌 상태를 확인하고 종료를 요청합니다.'],
      ['구현하며 고민한 것', ['Swift와 SwiftUI 기반 메뉴 막대 앱 및 설정 화면', '사용자의 명시적인 활성화와 접근성 권한을 전제로 한 동작', '저장 대화상자 또는 상태가 불확실한 경우 종료 건너뛰기', '강제 종료 대신 일반 종료 요청 사용']],
      ['개발 기록', '빌드와 설정 관련 검증을 진행했습니다. 다양한 실제 앱에서의 동작과 로그인 시 실행은 추가 확인이 필요합니다.'],
      ['사용 기술', 'Swift · SwiftUI · macOS Accessibility']
    ]
  },
  meetplan: {
    label: '03 / TEAM PROJECT', title: 'MeetPlan', intro: '여러 사람의 시간표에서 함께 만날 수 있는 시간을 찾는 프로젝트.',
    sections: [
      ['프로젝트 소개', '팀원들의 시간표를 바탕으로 공통으로 가능한 시간을 찾는 일정 추천 프로젝트입니다. 3인 팀의 작업 흐름과 일정 데이터 구조를 함께 정리했습니다.'],
      ['프로젝트에서 다룬 것', ['Python과 Streamlit 기반의 시간표 입력 및 분석 흐름', '요일과 시작·종료 시각을 통일한 일정 데이터 구조', '시간표 이미지 해상도에 비례하는 분석 좌표 처리', '인식 실패를 빈 일정으로 처리하지 않는 오류 구분']],
      ['개발 기록', '이미지 해상도별 처리와 중간보고서 작성까지 진행한 학습·협업 프로젝트입니다. 실제 시간표 이미지의 인식 정확도는 추가 검증이 필요합니다.'],
      ['사용 기술', 'Python · Streamlit · 이미지 처리']
    ]
  }
};
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '메뉴 열기'); }
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const dialog = document.querySelector('#project-dialog');
function showDetails(data) {
  document.querySelector('#dialog-label').textContent = data.label;
  document.querySelector('#dialog-title').textContent = data.title;
  document.querySelector('#dialog-intro').textContent = data.intro;
  const body = document.querySelector('#dialog-body'); body.replaceChildren();
  data.sections.forEach(([heading, content]) => {
    const title = document.createElement('h3'); title.textContent = heading; body.append(title);
    const element = document.createElement(Array.isArray(content) ? 'ul' : 'p');
    if (Array.isArray(content)) content.forEach(text => { const li = document.createElement('li'); li.textContent = text; element.append(li); });
    else element.textContent = content;
    body.append(element);
  });
  dialog.showModal(); dialog.scrollTop = 0; document.body.style.overflow = 'hidden';
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => showDetails(projects[button.dataset.project])));
if (dialog) {
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
}
