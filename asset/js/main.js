$(".btn-wish").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("on");
});

const $navBtn = $(".header__nav-btn");
const $navSub = $(".header__nav-sub");
const $cateLink = $(".category__link");
const $cateWrap = $(".category__wrap");
const $searchBtn = $(".header__auth-link--search");
$navBtn.hover(
  function () {
    // over
    $navBtn.addClass("on");
    $navSub.addClass("active");
  },
  function () {
    // out
    if (!$navSub.is(":hover")) {
      $navBtn.removeClass("on");
      $navSub.removeClass("active");
    }
  }
);

$navSub.mouseleave(function () {
  $navBtn.removeClass("on");
  $navSub.removeClass("active");
});

// 추가: $navSub가 hover될 때 상태 유지
$navSub.hover(
  function () {
    $navBtn.addClass("on");
    $navSub.addClass("active");
  },
  function () {
    $navBtn.removeClass("on");
    $navSub.removeClass("active");
  }
);

// 기본 활성화 탭 설정
const defaultTab = "#tab01";
const defaultCategoryKey = "women";

// 기본 탭 활성화
setActiveTab(defaultTab, defaultCategoryKey);

$cateLink.hover(
  function (e) {
    e.preventDefault();

    // 현재 data 값 가져오기
    const $tabName = $(this).data("tab");
    $(this).addClass("on").siblings($cateLink).removeClass("on");
    $($tabName).addClass("active").siblings($cateWrap).removeClass("active");

    let categoryKey = getCategoryKey($tabName);
    loadCategoryData(categoryKey, $tabName);
  },
  function () {
    // 현재 탭 있으면 탭 고정
    const $currentTabName = $(this).data("tab");

    // 아무 탭도 없으면 기본 탬
    if (
      !$cateLink.hasClass("on") ||
      $cateLink.filter(".on").data("tab") !== $currentTabName
    ) {
      setActiveTab(defaultTab, defaultCategoryKey);
    }
  }
);

// 기본 탭 활성화 함수
function setActiveTab(tab, categoryKey) {
  $(tab).addClass("active").siblings($cateWrap).removeClass("active");
  // filter - 특정 조건 필터링
  $cateLink
    .filter(`[data-tab="${tab}"]`)
    .addClass("on")
    .siblings($cateLink)
    .removeClass("on");

  // 기본 카테고리 로드 함수
  loadCategoryData(categoryKey, tab);
}

// 카테고리 키, 탭
function loadCategoryData(categoryKey, tab) {
  fetch("./asset/data/nav.json")
    .then((res) => res.json())
    .then((json) => {
      const categories = json.data[categoryKey].categories;
      const categoryWrap = document.querySelector(tab);
      const categoryBox = categoryWrap.querySelector(".category__list-box");
      categoryBox.innerHTML = ""; // 기존 내용 초기화

      categories.forEach((category) => {
        const categoryList = document.createElement("ul");
        categoryList.className = "category__list";

        const titleItem = document.createElement("li");
        titleItem.className = "category__item title";
        titleItem.innerHTML = `<a href="#">${category.title}</a>`;
        categoryList.appendChild(titleItem);

        category.items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.className = "category__item";
          listItem.innerHTML = `<a href="#">${item}</a>`;
          categoryList.appendChild(listItem);
        });

        categoryBox.appendChild(categoryList);
      });
    })
    .catch((error) => {
      console.error("JSON 오류 발생:", error);
    });
}

// 탭 이름에 맞는 카테고리 키 반환 함수
function getCategoryKey(tabName) {
  switch (tabName) {
    case "#tab01":
      return "women";
    case "#tab02":
      return "men";
    case "#tab03":
      return "beauty";
    case "#tab04":
      return "life";
    case "#tab05":
      return "kids";
    default:
      return "women";
  }
}
//header 축소
// 초기 높이 설정
const $headerHeight = $(".header").outerHeight();
$("#wrap").css("padding-top", $headerHeight);

$(".side-btn__wrap.bottom").css("--height", "42px");
$(".side-btn__wrap.top").css("--height", "0px");
const $headerOffsetTop = $(".header__nav").offset().top;
$(window).scroll(function (e) {
  const $scrollTop = $(this).scrollTop();

  if ($scrollTop >= $headerOffsetTop) {
    $(".header__nav").addClass("fixed");
    $(".header").addClass("on");
  } else {
    $(".header__nav").removeClass("fixed");
    $(".header").removeClass("on");
  }
  // if ($scrollTop > 100) { // 스크롤이 100px 이상일 때
  //   $('.header__nav').addClass('fixed');
  // } else {
  //   $('.header__nav').removeClass('fixed');
  // }
  // 현재 스크롤 위치 + 창의 높이
  const $scrollPosition = $scrollTop + $(window).height();
  // 문서의 전체 높이
  const $documentHeight = $(document).height();

  //스크롤 탑일 때
  if ($scrollTop === 0) {
    // alert('팁')
    $(".side-btn__wrap.bottom").css("--height", "42px");
    $(".side-btn__wrap.top").css("--height", "0px");
  } else if ($scrollPosition >= $documentHeight) {
    $(".side-btn__wrap.top").css("--height", "42px");
    $(".side-btn__wrap.bottom").css("--height", "0px");
  } else {
    $(".side-btn__wrap.top").css("--height", "42px");
    $(".side-btn__wrap.bottom").css("--height", "42px");
  }
});

$(".side-btn__wrap.top .btn-arrow").on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, 400);
  return false; // 클릭 시 기본 동작 방지
});
$(".side-btn__wrap.bottom .btn-arrow").on("click", function () {
  // 클릭 시 최신 문서 높이 계산
  const $documentHeight = $(document).height();
  $("html, body").animate(
    { scrollTop: $documentHeight - $(window).height() },
    400
  );
  return false;
});

$($searchBtn).on("click", function () {
  console.log("btn");
  $(this).css("display", "none");
  $(".header__search").css("display", "block");
});

// 메인 슬라이드
const visual = new Swiper(".visualSwiper", {
  slidesPerView: "auto", // 자동으로 슬라이드 크기에 맞게 조정
  centeredSlides: true, // 슬라이드를 중앙에 배치
  loop: true, // 루프 모드 활성화
  loopAdditionalSlides: 1,
  spaceBetween: 2, // 슬라이드 사이의 간격
  grabCursor: true, // 드래그 커서
  autoplay: {
    delay: 4000, // 4초
    disableOnInteraction: false, // 사용자가건들더라도 자동재생유지
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  speed: 500,
});
const yours = new Swiper(".yoursSwiper", {
  slidesPerView: 4,
  loop: true, // 루프 모드 활성화
  loopAdditionalSlides: 1,
  spaceBetween: 20,
  grabCursor: true, // 드래그 커서
  navigation: {
    nextEl: ".sc-product__yours .next",
    prevEl: ".sc-product__yours .prev",
  },
  speed: 500,
  breakpoints: {
    1400: {
      slidesPerView: 5,
    },
    1600: {
      slidesPerView: 6,
    },
    1920: {
      slidesPerView: 7,
    },
  },
});
const beauty = new Swiper(".beautySwiper", {
  slidesPerView: "auto",
  loop: true, // 루프 모드 활성화
  loopAdditionalSlides: 1,
  grabCursor: true, // 드래그 커서
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // 클릭 가능 여부
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  speed: 500,
});
const event = new Swiper(".eventSwiper", {
  slidesPerView: "auto",
  loop: true, // 루프 모드 활성화
  loopAdditionalSlides: 1,
  grabCursor: true, // 드래그 커서
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // 클릭 가능 여부
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  speed: 500,
});

// wdna
const $wdnaBtn = $(".header__auth-link--search");
$(".sc-product__wdna-item a").click(function (e) {
  e.preventDefault();
  const tabName = $(this).parent().data("tab");
  $(this).parent().addClass("active").siblings().removeClass("active");
  $(tabName).addClass("active").siblings().removeClass("active");
});

//info
$(".sc-info__board-tab a").mouseover(function (e) {
  e.preventDefault();
  const tabName = $(this).data("tab");
  $(this).addClass("active").siblings().removeClass("active");
  $(tabName).addClass("active").siblings().removeClass("active");
});
$(".sc-info__board-tab a").on("click", function (e) {
  e.preventDefault();
});
