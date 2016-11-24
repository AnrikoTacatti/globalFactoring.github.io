$(function(){
 dropItemList = $('.header-menu-list-item'),
 dropedList = $('.header-menu-list-drop'),
 topSect = $('.header-top'),
 topSlider = $('.header-slider'),
 condSect = $('.conditions'),
 seoSect = $('.seo'),
 bottomSlide = $('.comments-slide'),
 bottomSlideItem = $('.comments-slide-text');

 dropItemList.on('mouseover',function(){
   dropedList.removeClass('drop');
   $(this).find(dropedList).css('display','block').addClass('drop')
   .on('mouseout',function(){
     $(this).removeClass('drop');
   });
   topSect.on('mouseover',function(){
    dropedList.removeClass('drop');
   });
 });
 topSlider.owlCarousel({
   loop: true,
   items: 1,
   nav : true,
   navText:  [ '', '' ],
   smartSpeed: 1000,
   autoplay: true,
   dots: true
 });
 condSect.parallax({
   imageSrc: '../img/conditions/bg.jpg',
   speed: 0.1
 });
 seoSect.parallax({
   imageSrc: '../img/seo/bg.jpg',
   speed: 0.1,
 });
 bottomSlide.owlCarousel({
   loop: true,
   items: 2,
   nav : true,
   navText:  [ '', '' ],
   smartSpeed: 1000,
 });
 bottomSlideItem.equalHeights();
});
