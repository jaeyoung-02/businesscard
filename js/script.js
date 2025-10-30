// 페이지 로드 시 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    
    // 부드러운 스크롤 효과
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 스킬 태그에 호버 효과 강화
    const originalSkillTags = document.querySelectorAll('.skill-tag');
    originalSkillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 연락처 링크 클릭 시 피드백
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 이메일과 전화번호가 아닌 경우에만 새 창 열기
            if (this.href.startsWith('http')) {
                // 이미 target="_blank"로 설정되어 있으면 그대로 진행
                if (!this.hasAttribute('target')) {
                    e.preventDefault();
                    window.open(this.href, '_blank');
                }
            }
        });
    });

    // ▼▼▼ 모달 팝업 로직 (DOMContentLoaded 안으로 이동) ▼▼▼

    // 1. 필요한 HTML 요소 선택
    const skillTags = document.querySelectorAll('.skill-tag');
    const modal = document.getElementById('skillModal');
    const overlay = document.getElementById('modalOverlay');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalSkillTitle');
    const modalContent = document.getElementById('modalSkillContent');

    // 2. 모달 여는 함수
    function openModal(skillName) {
        // 클릭한 스킬 이름으로 모달 내용 업데이트
        modalTitle.textContent = skillName;
        
        // (선택 사항) 스킬별로 다른 내용을 보여주고 싶다면 여기서 처리
        if (skillName === "Driver's Licence (Class 1 Ordinary)") {
            modalContent.innerHTML = '1종 보통 운전면허를 보유하고 있습니다.<br><br>' + 
                                     '<strong><a href="https://www.koroad.or.kr/main/content/view/MN03040100.do" target="_blank">-한국도로교통공단-</a></strong>';
        } else if (skillName === "Github") {
            modalContent.innerHTML = "Git과 Github를 사용하여 버전 관리를 할 수 있습니다.";
        } else if (skillName === "Excel Beginner") {
            modalContent.innerHTML = "Excel을 다룰 수 있습니다.";
        } else if (skillName === "Barista Level 2") {
            modalContent.innerHTML = "바리스타 2급 자격증을 보유하고 있습니다.<br><br>' + 
                                     '<strong><a href="https://www.kca-coffee.org" target="_blank">-(사)한국커피협회-</a></strong>';
        } else if (skillName === "HTML Beginner") {
            modalContent.innerHTML = "HTML을 다룰 수 있습니다.";
        } else {
            modalContent.innerHTML = `"${skillName}" 스킬에 대한 상세 설명입니다.`;
        }
        
        // 모달과 오버레이 보이기
        modal.classList.add('show');
        overlay.classList.add('show');
    }

    // 3. 모달 닫는 함수
    function closeModal() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    }

    // 4. 이벤트 리스너 연결
    // 모든 스킬 태그에 클릭 이벤트 추가
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const skillName = tag.textContent; // 클릭된 태그의 텍스트 가져오기
            openModal(skillName);
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeButton.addEventListener('click', closeModal);

    // 오버레이 클릭 시 모달 닫기
    overlay.addEventListener('click', closeModal);

    // ▲▲▲ 모달 팝업 로직 (여기까지) ▲▲▲

}); // <-- DOMContentLoaded 리스너가 여기서 닫힙니다.

// vCard 생성 및 다운로드 함수
function downloadVCard() {
    // vCard 형식 데이터 생성
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:하재영
N:하;재영;;;
TEL;TYPE=CELL:010-4316-2708
EMAIL:mail@hajaeyoung.kr
URL:https://businesscard.hajaeyoung.kr
NOTE:연락처 저장 감사합니다.
END:VCARD`;

    // Blob 생성
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    // 다운로드 링크 생성 및 클릭
    const link = document.createElement('a');
    link.href = url;
    link.download = '하재영_명함.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // URL 해제
    window.URL.revokeObjectURL(url);
    
    // 사용자 피드백
    showNotification('명함이 다운로드되었습니다! 📱');
}

// 알림 메시지 표시 함수
function showNotification(message) {
    // 기존 알림이 있으면 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.4s ease-out;
        font-family: 'Noto Sans KR', sans-serif;
    `;
    
    // 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // DOM에 추가
    document.body.appendChild(notification);
    
    // 3초 후 제거
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// 테마 전환 기능 (추가 기능 - 나중에 활용 가능)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 로컬 스토리지에서 테마 불러오기
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 인터랙티브 배경 효과
function createInteractiveBackground() {
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX * speed) - (speed / 2);
            const y = (mouseY * speed) - (speed / 2);
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// 배경 인터랙션 초기화
createInteractiveBackground();

// 방문자 카운터 (LocalStorage 사용)
function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    console.log(`방문 횟수: ${count}`);
}

updateVisitorCount();

// 복사 방지 해제 (사용자 편의를 위해)
document.addEventListener('copy', function(e) {
    console.log('내용이 복사되었습니다.');
});
