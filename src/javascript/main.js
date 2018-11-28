$(function() {
    let windowView = "";
    
    if ( $(window).width() <= 767 ) {
        windowView = "mobile";
    } else {
        windowView = "PC";
    }

    handleSelectBox();
    handleFixedHeader();
    handleNavigationItem( windowView );
    handleScrollToTop();
    handleShowNavigationModal();
    handleShowModalCustomizedFlow();
});


// POPULATE SELECTBOX IN INQUIRY SECTION
function handleSelectBox() {
    const overView = [
        { value: '選択してください'},
        { value: '1'},
        { value: '2'}
    ];
    
    overView.forEach((value, key) => {
        $('#inquiries-overview').append('<option value="'+ key +'">' + value['value'] + '</option>');
    });
}
// END handleSelectBox

// HEADER FIXED ON LOAD AND SCROLL
function handleFixedHeader() {
    let getWindowPosition = $(window).scrollTop();
    let getSectionPosition = $('.header').offset().top;

    if ( getWindowPosition >= getSectionPosition ) {
        handleSetFixedHeader(true);
    } else {
        handleSetFixedHeader(false);
    }
    
    $(window).on('scroll', function() {
        if ( $(this).scrollTop() >= getSectionPosition ) {
            handleSetFixedHeader(true);
        } else {
            handleSetFixedHeader(false);
        }
    }); 
}

function handleSetFixedHeader(value) {
    if ( value == true ) {
        $('.header').addClass('header--fixed');
    } else {
        $('.header').removeClass('header--fixed');
    }
}
// END handleSetFixedHeader && handleFixedHeader


// WHEN CLICK NAVIGATION ITEM GO TO DESIRED SECTION
function handleNavigationItem( windowView ) {

    const navigationList = [
        { sectionName: 'js-top'},
        { sectionName: 'js-point'},
        { sectionName: 'js-customized'},
        { sectionName: 'js-customized-flow'},
        { sectionName: 'js-contactus'},
        { sectionName: 'js-operating-company'}
    ];

    if ( windowView === "PC" ) {
        $('.navigation__link').on('click', function() {
            let getClickedMenu = $(this).parent().data('index');
            let goToSection = $('#'+navigationList[getClickedMenu]['sectionName']).offset().top - 60;
    
            $("html, body").animate({
                scrollTop: goToSection
            }, 1000);
        });

        handleToActivateNavigation( navigationList );
        $(window).on('scroll', function() {
            handleToActivateNavigation( navigationList );
        })

    } else {
        $('.modal__navigation-item').on('click', function() {
            $(this).parents('.modal').fadeOut(500);
            $('.footer__icon-menu--close').hide();
            $('.footer__icon-menu').show();
            let getClickedMenu = $(this).data('index');
            let goToSection = +$('#'+navigationList[getClickedMenu]['sectionName']).offset().top;
            $("html, body").animate({
                scrollTop: goToSection
            }, 1000);
        });
    } 
}

function handleToActivateNavigation( navigations ) {
    const position = $(this).scrollTop();
    let navigationActive;

    navigations.forEach(function(value, key) {
        let topPosition = $('#' + value.sectionName ).offset().top - 60;
        if( position >= topPosition ) {
            navigationActive = key;
        }  
    });

    $('.navigation__link').removeClass('navigation__link--active');
    $('.navigation__item[data-index="'+ navigationActive +'"]').find('.navigation__link').addClass('navigation__link--active');
}

// END handleNavigationItem


// CLICKED TO SCROLL TO TOP ICON
function handleScrollToTop() {
    $('.footer__scroll-top').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });
}
// END handleScrollToTop


// SHOW NAVIGATION MODAL IN MOBILE VIEW
function handleShowNavigationModal() {
    $('.footer__icon-menu').on('click', function() {
        $('.modal').fadeIn(500);
        $(this).hide();
        $('.modal__navigation, .footer__icon-menu--close').show();
    });

    $('.footer__icon-menu--close').on('click', function() {
        $(this).hide();
        $('.footer__icon-menu').show();
        $('.modal, .modal__navigation').fadeOut(500);
    });
}
// END handleShowNavigationModal


function handleShowModalCustomizedFlow() {
    $('.customized-flow__item').on('click', function() {
        $('.modal__customized-content').html('');
        $('.modal__customized-content').append($(this).find('.customized-flow__item-description').text());
        $('.modal').fadeIn(500).css('z-index','2');
        $('.modal__navigation').hide();
        $('.modal__customized-flow').show();
    });

    $('.button--modal').on('click', function() {
        $('.modal__customized-content').html('');
        $('.modal').fadeOut(500).css('z-index','initial');
        $('.modal__customized-flow').hide();
    })
}