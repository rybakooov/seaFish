$(document).ready(function(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  function successAdd(text){
    $('.itemSuccessAdd-outer').fadeOut(200, function(){
      $('.itemSuccessAdd__text').html(text);
      $('.itemSuccessAdd-outer').fadeIn(400, function(){
        setTimeout(() => {
          $('.itemSuccessAdd-outer').fadeOut();
        }, 3000)
      })
    });
  }

  function showItemPopup(id) {

    console.log(id);
    //! Делаем запрос по айдишнику, получаем всю инфу по товару
    //! И подставляем

    $('.itemPopup-outer').fadeOut(200, () => {
      
      var img = 'assets/images/dish.jpg';
      var title = 'Печеный перец с крымским анчоусом и козьим домашним сыром';
      var weight = 250;
      var structure = 'красный болгарский перец, молодой козий сыр, тимьян, чеснок, бальзамический уксус, оливковое масло, соль, перец.';
      var table = {
        'Белки': '11.0 г',
        'Жиры': '12.0 г',
        'Углеводы': '1.0 г',
        'Энергитическая ценность': '1 164 кКал/100 г',
      }
      var price = '1 300';
      $('.itemPopup-imgbox img').attr('src', img);

      $('.itemPopup-desc__name').html(title);
      $('.itemPopup-desc__weight span').html(weight);
      $('.itemPopup-desc__structure span').html(structure);
      $('.itemPopup-desc-bottom__addDish span').html(price);

      $('.itemPopup-desc-table > div').remove();

      for(let row in table){
        $('.itemPopup-desc-table').append(`
          <div class="itemPopup-desc-table-row">
            <p class="itemPopup-desc-table-row__key">${row}</p>
            <div class="itemPopup-desc-table-row__dots"></div>
            <p class="itemPopup-desc-table-row__value">${table[row]}</p>
          </div>
        `)
      }
      $('.itemPopup-outer').fadeIn();
    });



  }
  if($('.itemPopup-outer').length){
    $('.itemPopup-outer').hide();
  }
  if($('.itemSuccessAdd-outer').length){
    $('.itemSuccessAdd-outer').hide();
  }


  if($('.banner').length){
    $('.banner').owlCarousel({
      responsive: {
        0: {
          autoWidth: true,
          margin: 16,
          loop: true,
          dots: false,
          nav: false,
          autoplay: true, 
          lazyLoad: true,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
        },
        768: {
          center: true,
          items: 1,
          margin: 24,
        }
      }
    });
  }

  if($('.about-slider').length){
    $('.about-slider').owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      nav: false,
      autoplay: true, 
      lazyLoad: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true
    });
  }

  if($('.profile-wrap').length){
    $('.profile-item').each(function(){
      $(this).hide();
    })
    $('.profile-item_active').show();
  }

  let animatedTabs = false; 
  $(document).on('click', '.profile-tabs-tab', function(event){
    event.preventDefault();
    if($($(this)[0].hash).css('display') == 'none' && animatedTabs == false){
      animatedTabs = true;
      $('.profile-tabs-tab_active').removeClass('profile-tabs-tab_active');
      $(this).addClass('profile-tabs-tab_active');
      $('.profile-item_active').fadeOut(400, () => {
        $('.profile-item_active').removeClass('profile-item_active');
        $($(this)[0].hash).addClass('profile-item_active');
        $($(this)[0].hash).fadeIn(400, () => {
          animatedTabs = false;
        });
      })
    }
  })


  $(document).on('click', '.cardItem', function(){
    showItemPopup(123);
  })

  $(document).on('click', '.itemPopup__close', () => {
    $('.itemPopup-outer').fadeOut();
  });



  $(document).on('click', '.cardItem-desc__addDish', (event) => { //! Добавление в корзину
    event.stopPropagation();
    var dish = $(event.target).closest('.cardItem-desc').find('.cardItem-desc__name').html();
    successAdd(dish);
  })

  $(document).on('click', '.itemPopup-desc-bottom__addDish', (event) => {
    event.stopPropagation();
    var dish = $(event.target).closest('.itemPopup-desc').find('.itemPopup-desc__name').html();
    successAdd(dish);
  })








  //! Новые скрипты ниже

  if($('#datePicker').length){
    $.datetimepicker.setLocale('ru');
    $('#datePicker').datetimepicker({
      value: new Date(),
      timepicker: false,
      format:'d.m.Y',
      minDate: 0,
      dayOfWeekStart: 1,
    });
    $('#timePicker').datetimepicker({
      value: new Date(),
      datepicker: false,
      format: 'H:i',
      step: 15,
    });
  }


  
  if($('.regAuthPopup-outer').length){
    $('.regAuthPopup-outer').each(function(){
      $(this).hide();
    });
  }

  $(document).on('click', '.regAuthPopup__close', function(){
    $(this).closest('.regAuthPopup-outer').fadeOut();
  })


  var isReg = true;

  $(document).on('click', '[data-reg=""]', function(e){
    e.preventDefault();
    if(isReg == true) {
      $('.regAuthPopup-outer_reg').fadeIn();
    } else {
      $('.regAuthPopup-outer_auth').fadeIn();
    }
  })
  
  $(document).on('click', '.regAuthPopup__regOrAuth', function(e){
    e.preventDefault();
    if(isReg == true) {
      $('.regAuthPopup-outer_reg').fadeOut(400, () => {
        $('.regAuthPopup-outer_auth').fadeIn();
      });
    } else {
      $('.regAuthPopup-outer_auth').fadeOut(400, () => {
        $('.regAuthPopup-outer_reg').fadeIn();
      });
    }
    isReg = !isReg;
  })
  



  if($('.reservePopup-outer').length){
    $('.reservePopup-outer').hide();
  }

  $(document).on('click', '.reservePopup__close', function(){
    $(this).closest('.reservePopup-outer').fadeOut();
  })

  $(document).on('click', '[data-reserve=""]', function() {
    $('.reservePopup-outer').fadeIn();
  })

  
  
  if($('.editAddress-outer').length){
    $('.editAddress-outer').hide();
  }
  
  $(document).on('click', '.editAddress__close', function(){
    $(this).closest('.editAddress-outer').fadeOut();
  })


  $(document).on('click', '[data-editAddress=""]', function(e){
    e.preventDefault();
    $('.editAddress-outer').fadeIn();
  })



  $(document).on('click', '.header__burger', () => {
    $('.header-outer').toggleClass('header-outer_active');
    $('.menu').slideToggle();
  })

});