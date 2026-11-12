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

// dday_sample.html의 Date 객체와 날짜 차이 계산 흐름을 사용합니다.
const ddayForm = document.querySelector('#dday-form');
if (ddayForm) {
  const input = document.querySelector('#target-date');
  input.addEventListener('input', () => input.setCustomValidity(''));
  ddayForm.addEventListener('submit', event => {
    event.preventDefault();

    // 1. 오늘 날짜 객체 생성
    let now = new Date();

    // 2. prompt() 대신 화면의 날짜 입력란에서 연, 월, 일을 가져옵니다.
    let dateParts = input.value.split('-');
    let year = Number(dateParts[0]);
    let month = Number(dateParts[1]);
    let day = Number(dateParts[2]);

    // 3. 목표 날짜 객체 생성 (월은 0부터 시작)
    let targetDate = new Date(year, month - 1, day);
    // Date 생성자가 1~99년을 1901~1999년으로 해석하는 동작을 보정합니다.
    targetDate.setFullYear(year);
    if (!year || targetDate.getFullYear() !== year ||
        targetDate.getMonth() !== month - 1 || targetDate.getDate() !== day) {
      input.setCustomValidity('올바른 날짜를 입력해 주세요.');
      input.reportValidity();
      return;
    }

    // 시각과 서머타임 때문에 날짜 차이가 달라지지 않도록
    // 두 날짜의 연·월·일을 UTC 자정으로 맞춥니다.
    now.setUTCFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    now.setUTCHours(0, 0, 0, 0);
    targetDate.setUTCFullYear(year, month - 1, day);
    targetDate.setUTCHours(0, 0, 0, 0);

    // 4. 날짜 차이 계산 (밀리초 단위)
    let diffMs = targetDate.getTime() - now.getTime();

    // 5. 밀리초를 일 단위로 변환
    let diffDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    // 6. document.write() 대신 기존 결과 영역의 글자를 바꿉니다.
    const result = document.querySelector('#dday-value');
    const description = document.querySelector('#dday-description');
    if (diffDay === 0) {
      result.textContent = 'D-Day';
      description.textContent = input.value + ' · D-Day 입니다!';
    } else if (diffDay > 0) {
      result.textContent = 'D-' + diffDay;
      description.textContent = input.value + ' · ' + diffDay + '일 남았습니다.';
    } else {
      result.textContent = 'D+' + Math.abs(diffDay);
      description.textContent = input.value + ' · ' + Math.abs(diffDay) + '일 지났습니다.';
    }
  });
}

// random_sample.html의 String → Array → Math 순서를 사용합니다.
const randomForm = document.querySelector('#random-form');
if (randomForm) {
  const input = document.querySelector('#random-items');
  let drawCount = 0;
  input.addEventListener('input', () => input.setCustomValidity(''));
  randomForm.addEventListener('submit', event => {
    event.preventDefault();

    // 1. prompt() 대신 화면의 입력란에서 문자열을 가져옵니다.
    let inputString = input.value;

    // 2. 줄바꿈도 쉼표로 바꾼 뒤 split(',')으로 배열을 만듭니다.
    inputString = inputString.replace(/\r?\n/g, ',');
    let items = inputString.split(',');

    // 빈 항목과 중복을 제외하는 부분만 예제에 추가했습니다.
    let cleanedItems = [];
    for (let i = 0; i < items.length; i++) {
      let item = items[i].trim();
      if (item !== '' && !cleanedItems.includes(item)) {
        cleanedItems.push(item);
      }
    }
    items = cleanedItems;
    if (items.length === 0) {
      input.setCustomValidity('뽑을 항목을 하나 이상 입력해 주세요.');
      input.reportValidity();
      return;
    }

    // 3. Math.random()과 Math.floor()로 랜덤 인덱스 뽑기
    let index = Math.floor(Math.random() * items.length);
    let choice = items[index].trim();

    // 4. document.write() 대신 결과 영역에 텍스트로 출력합니다.
    document.querySelector('#random-value').textContent = choice;
    drawCount += 1;
    document.querySelector('#random-description').textContent = drawCount +
      '번째 뽑기 · ' + items.length + '개 중 선택했습니다. 다시 뽑으면 같은 항목이 나올 수도 있어요.';
  });
}
