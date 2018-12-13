$(function() {
    let windowView;
    
    if ( $(window).width() <= 767 ) {
        windowView = "mobile";
    } else {
        windowView = "PC";
    }

    handleFixedHeader();
    handleNavigationItem( windowView );
    handleScrollToTop();
    handleShowNavigationModal();
    handleShowModalCustomizedFlow( windowView );
    handleFormValidation();
    handleClickButtonInBanner();
    handleClickButtonInCustomizationExample( windowView );
    handleGetyear();
    handleCopyClipBoard();
});

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
            let goToSection = $('#'+navigationList[getClickedMenu]['sectionName']).offset().top - 40;
    
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
            $('.footer__menu-icon').removeClass('footer__menu-icon--active');
            //handlePreventPageScrollingModal(0);
            let getClickedMenu = $(this).data('index');
            let goToSection = +$('#'+navigationList[getClickedMenu]['sectionName']).offset().top;
            $("html, body").animate({
                scrollTop: goToSection
            }, 1000);
        });
    } 
}

function handleClickButtonInBanner() {
    let goToSection = $('#js-customized').offset().top - 40;
    $('.button--banner').on('click', function() {
        $("html, body").animate({
            scrollTop: goToSection
        }, 1000); 
    })
}

function handleClickButtonInCustomizationExample() {
    $('.button--white').on('click', function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#js-contactus').offset().top
        }, 1000); 
    })
}

function handleToActivateNavigation( navigations ) {
    const position = $(this).scrollTop();
    let navigationActive;
    navigations.forEach(function(value, key) {
        let topPosition = $('#' + value.sectionName ).offset().top - 60;
        if( position >= topPosition ) {
            navigationActive = key;
        } 
        if ( position >= 4000 ) {
            navigationActive = 5;
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
    $('.footer__menu-icon').on('click', function() {
        if ( $(this).hasClass('footer__menu-icon--active') == true ) {
            $('.modal').fadeOut(500);
            $(this).removeClass('footer__menu-icon--active');
            $('.modal__navigation').hide();
            //handlePreventPageScrollingModal(0);
        } else {
            $('.modal').fadeIn(500);
            //handlePreventPageScrollingModal(1);
            $(this).addClass('footer__menu-icon--active');
            $('.modal__navigation').show();
        }
    });
}
// END handleShowNavigationModal


// SHOW MODAL IN CUSTOMIZED FLOW SECTION MOBILE VIEW
function handleShowModalCustomizedFlow( windowView ) {
    if ( windowView == "mobile") {
        $('.customized-flow__item').on('click', function() {
            $('.modal__customized-content').html('');
            $('.modal__customized-content').append($(this).find('.customized-flow__item-description').text());
            $('.modal').fadeIn(500).css('z-index','2');
            $('.modal__navigation').hide();
            $('.modal__customized-flow').show();
            //handlePreventPageScrollingModal(1);
        });

        $('.button--modal').on('click', function() {
            $('.modal__customized-content').html('');
            $('.modal').fadeOut(500).css('z-index','initial');
            $('.modal__customized-flow').hide();
            //handlePreventPageScrollingModal(0);
        });
    }
}
// END handleShowModalCustomizedFlow

function htmlEntities(string) {
    return String(string).
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;').
        replace(/"/g, '&quot;').
        replace(/\n/g, '<br>');
}

function handleFormValidation() {
    let companyName = false;
    let departmentName = true;
    let personInCharge = false;
    let mailAddress = false;
    let summaryTitle = false;
    let contentText = false;

    $('.button.button--submit').attr('disabled', 'disabled');

    // COMPANY NAME
    $('#companyName').on('keyup blur', function(e) {
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 0 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if ( $(this).val().length > 100 ) {
                    companyName = false;
                    $(this).parents('.inquiries__form-list').addClass('js-error');
                } else {
                    companyName = true;
                    $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
                }
            } else {
                companyName = false;
                $(this).parents('.inquiries__form-list').addClass('js-error');
            }
        } else {
            companyName = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        }
    });

    // DEPARTMENT NAME
    $('#departmentName').on('keyup blur', function() {
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if( !halfWidthKana.test($(this).val())) { 
            if ( $(this).val().length > 100 ) {
                departmentName = false;
                $(this).parents('.inquiries__form-list').addClass('js-error');
            } else {
                departmentName = true;
                $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
            }
        } else {
            departmentName = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        }
    });

    // PERSON IN CHARGE
    $('#personInCharge').on('keyup blur', function() {
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 0 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if ( $(this).val().length > 100 ) {
                    personInCharge = false;
                    $(this).parents('.inquiries__form-list').addClass('js-error');
                } else {
                    personInCharge = true;
                    $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
                }
            } else {
                personInCharge = false;
                $(this).parents('.inquiries__form-list').addClass('js-error');
            }
        } else {
            personInCharge = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        }
    });

    // EMAIL ADDRESS
    $('#mailAddress').on('keyup blur', function(e) {
        emailAddress = $(this);
        let emailRegex = /^[^./@]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        let halfWidthKana = /[\uFF00-\uFFEF]/g;

        if ( $(this).val().length > 0 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if ( ( !emailRegex.test(emailAddress.val())) || ( $(this).val().length > 255 ) || ((/\s+/).test($(this).val())) ){ 
                    mailAddress = false;
                    $(this).parents('.inquiries__form-list').addClass('js-error');
                } 
                else {
                    mailAddress = true;
                    $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
                }
            } 
            else {
                mailAddress = false;
                $(this).parents('.inquiries__form-list').addClass('js-error');
            }
        } else {
            mailAddress = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        }
    });

    // TITLE / INQURIES OVERVIEW
    $('#inquiries-overview').on('change focus', function() {
        if ( +$(this).val() === 0 ) {
            summaryTitle = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        } else {
            summaryTitle = true;
            $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
        }
    });

    // CONTENTS ( BODY )
    $('#contents').on('keyup blur', function() {
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 0 ) {
            if( !halfWidthKana.test($(this).val())) {
                if ( $(this).val().length > 2000 ) {
                    contentText = false;
                    $(this).parents('.inquiries__form-list').addClass('js-error');
                } else {
                    contentText = true;
                    $(this).parents('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
                }
            } else {
                contentText = false;
                $(this).parents('.inquiries__form-list').addClass('js-error');
            }
        } else {
            contentText = false;
            $(this).parents('.inquiries__form-list').addClass('js-error');
        }
    });

    let textBoxEmpty = false;
    $('input, select, textarea').on('keyup change', function() {
        let passData = false;
        let selectbox = false;
        let isEmpty = $('.js-required').filter(function() {
            return this.value === "";
        });

        $('select').val() != 0 ? selectbox = true : selectbox = false;

        isEmpty.length ? textBoxEmpty = false : textBoxEmpty = true; 

        if ( selectbox == true && textBoxEmpty == true ) {
            $('.button.button--submit').removeAttr('disabled');
            if ( companyName == true  && departmentName == true && personInCharge == true && 
                mailAddress == true && summaryTitle == true && contentText == true ) {
                passData = true;
            } else {
                passData = false;
            }
        } else {
            $('.button.button--submit').attr('disabled','disabled');
        }
        $('#inquiriesData').val(passData);
    });
    handleGetFormInputValue();   
}

function handleGetFormInputValue() {
    $('.button--submit').on('click', function() {
        let value = $('#inquiriesData').val();

        if ( value === "true" ) {
            let getDateTime = new Date();
            let getFullMinutes = (getDateTime.getMinutes()<10?'0':'') + getDateTime.getMinutes(); 
            let dateTimeFormat = getDateTime.getFullYear() + "-" + (getDateTime.getMonth()+1) + "-" + getDateTime.getDate() + " " + getDateTime.getHours() + ":" + getFullMinutes;

            let getUrl = window.location.href; 
            let mailContent = {
                companyName       : htmlEntities($('#companyName').val()),
                departmentName    : htmlEntities($('#departmentName').val()),
                personInCharge    : htmlEntities($('#personInCharge').val()),
                mailAddress       : htmlEntities($('#mailAddress').val()),
                inquiriesOverview : htmlEntities($('#inquiries-overview option[id="'+ $('#inquiries-overview').val() +'"]').text()),
                contents          : htmlEntities($('#contents').val()),
                dateTime          : htmlEntities(dateTimeFormat),
                websiteUrl        : htmlEntities(getUrl)
            };
            handleSendMessage( mailContent );
            $('.inquiries__form-list').removeClass('js-error, inquiries__form-list--error');
        } else {
            $('.js-error').addClass('inquiries__form-list--error');
            toastr.error("適切にご入力ください");
        }
    });
}


function handleSendMessage( value ) {
    let validationStatus;
    const emailSender      = 'sendonly@y-n-s.co.jp';
    const emailReceiver    = 'issue-SMN-bx7EwRrfyy8Z9Wvzu43ANT4Jp@i3.backlog.jp';
    const emailHost        = 'smtp.elasticemail.com'; 
    const password         = '6d73e66e-e141-48fb-bae1-20c8ea89b3b7'; 
    const emailAddress     = 'third.party.service.yns@gmail.com'; 

    // FOR TESTING
    //const emailHost        = 'smtp.gmail.com';
    //const password         = 'ynsadmin1234'; 

    let departNameAndSummaryValue = "";
    if ( value['departmentName'] === "") {
        departNameAndSummaryValue = value['personInCharge'];
    } else {
        departNameAndSummaryValue = value['departmentName'] + " - " + value['personInCharge'];
    }

    Email.send(
        emailSender,
        emailReceiver,
        `${value['companyName']}`,
        `${value['companyName']}`+ ' - ' +`${value['inquiriesOverview']}` + '<br>' + `${departNameAndSummaryValue}` + '<br>' + `${value['mailAddress']}` + '<br>' + `${value['contents']}` + '<br><br>' + `${value['dateTime']}` + '<br>' + `${value['websiteUrl']}`,
        emailHost,
        emailAddress,
        password,
        function done(message) {
            if ( message === "OK" ) {
                validationStatus = true;
                $('input, textarea').val('');
                $('select').val(0);
                $('.button.button--submit').attr('disabled','disabled');
            } else {
                validationStatus = false;
            }

            handleSideNotification( validationStatus ); // Call function to show sidebar notification
        }
    );
}


function handleSideNotification( validationStatus ) {

    if ( validationStatus === true ) {
        toastr.success("ありがとうございます。担当より連絡いたしますので、しばらくお待ちください");
        $('.inquiries__form-list').removeClass('js-error inquiries__form-list--error');
    } else {
        toastr.error("エラー！もう一度試してみてください")
    }
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "1000",
        "timeOut": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

function handleGetyear() {
    let getDate = new Date();
    let getYear = getDate.getFullYear('YYYY');
    $('#js-year').text(" "+getYear);
}

function handlePreventPageScrollingModal(modalState) {
    let top;
    let topValue;

    if(modalState == 0) {       
        top = $('body').css('top')
        topValue =  Math.abs(parseInt(top));
        $('body').removeClass('body--fixed');
        window.scrollTo(0, topValue);
    } else {
        top = $(window).scrollTop();
        $('body').addClass('body--fixed').css('top', '-' + top  + 'px');
    }
}

function handleCopyClipBoard() {
    let getPath = window.location.href;
    $('#copy-clipboard').attr('data-clipboard-text',getPath);
    var clipboard = new ClipboardJS('#copy-clipboard');
    clipboard.on('success', function(e) {
        e.clearSelection();
        toastr.success("URLをコピーしました");
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "3000",
            "hideDuration": "1000",
            "timeOut": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    });
}
