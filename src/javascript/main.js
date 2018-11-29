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
    handleShowModalCustomizedFlow( windowView );
    handleFormValidation();
    handleGetFormInputValue();
    handleClickButtonInBanner();
    handleClickButtonInCustomizationExample( windowView );
});


// POPULATE SELECTBOX IN INQUIRY SECTION
function handleSelectBox() {
    const overView = [
        { value: '選択してください'},
        { value: 'カスタマイズのご相談'},
        { value: '取材のご依頼'},
        { value: 'その他お問い合わせ'}
    ];
    
    overView.forEach((value, key) => {
        $('#inquiries-overview').append('<option value="'+ key +'" id="'+ key +'">' + value['value'] + '</option>');
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

function handleClickButtonInBanner() {
    let goToSection = $('#js-customized').offset().top - 60;
    $('.button--banner').on('click', function() {
        $("html, body").animate({
            scrollTop: goToSection
        }, 1000); 
    })
}

function handleClickButtonInCustomizationExample( windowView ) {
    let goToSection;

    if ( windowView === "PC" ) {
        goToSection = $('#js-contactus').offset().top - 60;
    } else {
        goToSection = $('#js-contactus').offset().top
    }

    $('.button--white').on('click', function() {
        $("html, body").animate({
            scrollTop: goToSection
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


// SHOW MODAL IN CUSTOMIZED FLOW SECTION MOBILE VIEW
function handleShowModalCustomizedFlow( windowView ) {
    if ( windowView == "mobile") {
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
    const formValidationMessage = [
        {
            companyName: { 
                required     : "Company name is required",
                minMaxLength : "Minimum of 1, Maximum of 100 characters only",
                halfWidthKana : "Half width kana is not allowed"
            },
            departmentName: {
                maxLength : "Maximum of 100 characters only",
                halfWidthKana : "Half width kana is not allowed"
            },
            personInCharge: {
                required     : "Person in charge is required",
                minMaxLength : "Maximum of 100 characters only",
                halfWidthKana : "Half width kana is not allowed"
            },
            mailAddress: {
                required        : "Email Address is required",
                emailValidation : "Email address format is invalid",
                halfWidthKana : "Half width kana is not allowed"
            },
            summaryTitle: {
                required : "Summary title is required"
            },
            content: {
                required     : "Content is required",
                minMaxLength : "Minimum of 2 and maximum of 2000 characters only",
                halfWidthKana : "Half width kana is not allowed"
            }
        }
    ];

    let companyName = false;
    let departmentName = false;
    let personInCharge = false;
    let mailAddress = false;
    let summaryTitle = false;
    let contentText = false;

    $('.button.button--submit').attr('disabled', 'disabled');

    // COMPANY NAME
    $('#companyName').on('keyup', function(e) {
        let errorMessage = "";
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 1 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if ( $(this).val().length > 100 ) {
                    errorMessage = formValidationMessage[0]['companyName']['minMaxLength'];
                    $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                    companyName = false;
                } else {
                    $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
                    errorMessage = '';
                    companyName = true;
                }
            } else {
                errorMessage = formValidationMessage[0]['companyName']['halfWidthKana'];
                $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                companyName = false;
            }
        } else {
            errorMessage = formValidationMessage[0]['companyName']['required'];
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            companyName = false;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);    
    });

    // DEPARTMENT NAME
    $('#departmentName').on('keyup', function() {
        let errorMessage = "";
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if( !halfWidthKana.test($(this).val())) { 
            if ( $(this).val().length > 100 ) {
                    errorMessage = formValidationMessage[0]['departmentName']['maxLength'];
                    $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                    departmentName = false;
            } else {
                $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
                errorMessage = "";
                departmentName = true;
            }
        } else {
            errorMessage = formValidationMessage[0]['departmentName']['halfWidthKana'];
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            departmentName = false;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);
    });

    // PERSON IN CHARGE
    $('#personInCharge').on('keyup', function() {
        let errorMessage = "";
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 1 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if ( $(this).val().length > 100 ) {
                    errorMessage = formValidationMessage[0]['personInCharge']['minMaxLength'];
                    $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                    personInCharge = false;
                } else {
                    $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
                    errorMessage = '';
                    personInCharge = true;
                }
            } else {
                errorMessage = formValidationMessage[0]['personInCharge']['halfWidthKana'];
                $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                personInCharge = false;
            }
        } else {
            errorMessage = formValidationMessage[0]['personInCharge']['required'];
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            personInCharge = false;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);
    });

    // EMAIL ADDRESS
    $('#mailAddress').on('keyup', function(e) {
        emailAddress = $(this);
        let emailRegex = /^[^./@]+[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        let errorMessage = "";

        if ( $(this).val().length > 1 ) {
            if( !halfWidthKana.test($(this).val())) { 
                if( !emailRegex.test(emailAddress.val())) { 
                    $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                    errorMessage = formValidationMessage[0]['mailAddress']['emailValidation'];
                    mailAddress = false;
                } else {
                    $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
                    errorMessage = "";
                    mailAddress = true;
                }
            } else {
                errorMessage = formValidationMessage[0]['mailAddress']['halfWidthKana'];
                $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                mailAddress = false;
            }
        } else {
            errorMessage = formValidationMessage[0]['mailAddress']['required'];
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            mailAddress = false;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);
    });

    // TITLE / INQURIES OVERVIEW
    $('#inquiries-overview').on('change focus', function() {
        let errorMessage = "";
        if ( +$(this).val() === 0 ) {
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            errorMessage = formValidationMessage[0]['summaryTitle']['required'];
            summaryTitle = false;
        } else {
            $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
            errorMessage = "";
            summaryTitle = true;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);
    });

    // CONTENTS ( BODY )
    $('#contents').on('keyup', function() {
        let errorMessage = "";
        let halfWidthKana = /[\uFF00-\uFFEF]/g;
        if ( $(this).val().length > 0 ) {
            if( !halfWidthKana.test($(this).val())) {
                if ( $(this).val().length > 2000 ) {
                    errorMessage = formValidationMessage[0]['content']['minMaxLength'];
                    $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                    contentText = false;
                } else {
                    $(this).parents('.inquiries__form-list').removeClass('inquiries__form-list--error');
                    errorMessage = "";
                    contentText = true;
                }
            } else {
                errorMessage = formValidationMessage[0]['content']['halfWidthKana'];
                $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
                contentText = false;
            }
        } else {
            errorMessage = formValidationMessage[0]['content']['required'];
            $(this).parents('.inquiries__form-list').addClass('inquiries__form-list--error');
            contentText = false;
        }
        $(this).next('.inquiries__form-error').text(errorMessage);
    });

    $('input, select, textarea').on('keyup change', function() {
        if ( companyName === true  && departmentName === true && personInCharge === true && 
            mailAddress === true && summaryTitle === true && contentText === true ) {
           $('.button.button--submit').removeAttr('disabled');
       } else {
        $('.button.button--submit').attr('disabled','disabled');
       }
    });
}

function handleGetFormInputValue() {
    $('.button--submit').on('click', function() {
        let getDateTime = new Date();
        let dateTimeFormat = getDateTime.getFullYear() + "-" + (getDateTime.getMonth()+1) + "-" + getDateTime.getDate() + " " + getDateTime.getHours() + ":" + getDateTime.getMinutes();
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
    });
}


function handleSendMessage( value ) {
    let validationStatus;
    const emailSender      = 'sendonly@y-n-s.co.jp';
    const emailReceiver    = 'issue-SMN-bx7EwRrfyy8Z9Wvzu43ANT4Jp@i3.backlog.jp';
    // const emailHost        = 'smtp.elasticemail.com'; 
    // const password         = '6d73e66e-e141-48fb-bae1-20c8ea89b3b7'; 
    const emailAddress     = 'third.party.service.yns@gmail.com'; 

    // FOR TESTING
    const emailHost        = 'smtp.gmail.com'; 
    const password         = 'ynsadmin1234'; 

    Email.send(
        emailSender,
        emailReceiver,
        `${value['companyName']}`+ ' - ' +` ${value['inquiriesOverview']}`,
        `${value['departmentName']}` + '-' + `${value['personInCharge']}` + '<br>' + `${value['mailAddress']}` + '<br>' + `${value['contents']}` + '<br><br>' + `${value['dateTime']}` + '<br>' + `${value['websiteUrl']}`,
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
        toastr.success("You've Successfully Send Your Message!");
    } else {
        toastr.error("Failed!")
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
