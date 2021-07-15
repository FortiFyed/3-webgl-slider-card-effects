gsap.registerPlugin(ScrollTrigger)

const initSlider = () => {
    rgbKineticSlider = new rgbKineticSlider({

        slideImages: images, // array of images > must be 1920 x 1080
        itemsTitles: texts, // array of titles / subtitles

        backgroundDisplacementSprite: 'img/map-3.jpg', // slide displacement image 
        cursorDisplacementSprite: 'img/displace-circle.png', // cursor displacement image

        cursorImgEffect : true, // enable cursor effect
        cursorTextEffect : false, // enable cursor text effect
        cursorScaleIntensity : 0.65, // cursor effect intensity
        cursorMomentum : 0.14, // lower is slower

        swipe: true, // enable swipe
        swipeDistance : window.innerWidth * 0.4, // swipe distance - ex : 580
        swipeScaleIntensity: 2, // scale intensity during swipping

        slideTransitionDuration : 1, // transition duration
        transitionScaleIntensity : 30, // scale intensity during transition
        transitionScaleAmplitude : 160, // scale amplitude during transition

        nav: true, // enable navigation
        navElement: '.main-nav', // set nav class

        imagesRgbEffect : false, // enable img rgb effect
        imagesRgbIntensity : 0.9, // set img rgb intensity
        navImagesRgbIntensity : 80, // set img rgb intensity for regular nav 

        textsDisplay : true, // show title
        textsSubTitleDisplay : true, // show subtitles
        textsTiltEffect : true, // enable text tilt
        googleFonts : ['Playfair Display:700', 'Roboto:400'], // select google font to use
        buttonMode : false, // enable button mode for title
        textsRgbEffect : true, // enable text rgb effect
        textsRgbIntensity : 0.03, // set text rgb intensity
        navTextsRgbIntensity : 15, // set text rgb intensity for regular nav

        textTitleColor : 'white', // title color
        textTitleSize : 125, // title size
        mobileTextTitleSize : 125, // title size
        textTitleLetterspacing : 3, // title letterspacing

        textSubTitleColor : 'white', // subtitle color ex : 0x000000
        textSubTitleSize : 21, // subtitle size
        mobileTextSubTitleSize : 21, // mobile subtitle size
        textSubTitleLetterspacing : 2, // subtitle letter spacing
        textSubTitleOffsetTop : 90, // subtitle offset top
        mobileTextSubTitleOffsetTop : 90, // mobile subtitle offset top
    });
}

// welcome animation => currently disabled
const WelcomeScreen = () => {
    let tl = gsap.timeline()
    tl.from('.welcome_animation .animation_clip', {
        duration: 1,
        y: '100%',
        ease: Expo.easeInOut,
    }).from('.welcome_animation .animation_content', {
        delay: .1,
        duration: 1,
        y: '100%',
        ease: Expo.easeInOut,
    }, '-=1').to('.welcome_animation .animation_content', {
        delay: 1,
        duration: 1,
        y: '-100%',
        ease: Expo.easeInOut,
    }).to('.welcome_animation .animation_clip', {
        delay: .1,
        duration: 1,
        y: '-100%',
        ease: Expo.easeInOut,
        onComplete(){
            document.querySelector('.welcome_animation').classList.add('hide')
        }
    }, '-=1')
}

const initGsapAnimation = () => {
    document.querySelector('main').classList.remove('hide')
    gsap.timeline().from('main', {
        delay: 1,
        duration: 1,
        opacity: 0,
        ease: Expo.easeInOut,
        onComplete(){
            document.querySelector('.loader_wrapper').classList.add('hide')
        }
    })// navigation
    .from(".logo", {
        delay: .1,
        duration: .5,
        x: '-100%',
        opacity: 0,
        ease: Expo.easeInOut
    }, '-=.5')
    .from(".menu", {
        delay: .1,
        duration: .5,
        x: '100%',
        opacity: 0,
        ease: Expo.easeInOut
    }, '-=.5')
    .from(".social", {
        delay: .2,
        duration: .5,
        x: '-100%',
        opacity: 0,
        ease: Expo.easeInOut
    }, '-=.5')
    .from(".nav", {
        delay: .3,
        duration: .5,
        x: '100%',
        opacity: 0,
        ease: Expo.easeInOut
    }, '-=.5')
    // cards
    .from("#card_1", {
        delay: .2,
        duration: 2,
        y: '100%',
        ease: Expo.easeInOut
    }, '-=1.5')
    .from("#card_2", {
        duration: 2,
        y: '100%',
        ease: Expo.easeInOut
    }, '-=1.5')
    .from("#card_3", {
        duration: 2,
        y: '100%',
        ease: Expo.easeInOut
    }, '-=1.5')
}

const initCardAnimation = () => {
    const cards = document.querySelectorAll('.card')

    cards.forEach(function(item) {
        const item_id = '#'+item.getAttribute('id')
        const timeline = gsap.timeline()

        item.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            e.stopPropagation();

            timeline.to(item_id + ' .card_footer .__footer_animate', {
                opacity: 0,
                duration: .2,
                y: '10%',
                ease: Expo.easeInOut,
            }).to(item_id + ' .__header_animate', {
                opacity: 0,
                duration: .2,
                y: '-10%',
                ease: Expo.easeInOut,
                onComplete(){
                    document.querySelector(item_id + ' .card_footer .__footer_animate').classList.add('hide')
                    document.querySelector(item_id + ' .card_footer .card_hide').classList.remove('hide')
    
                    timeline.to(item_id + ' .card_footer .card_hide', {
                        opacity: 1,
                        duration: .1,
                        y: '-10%',
                    })
                    gsap.set(item, {clearProps: "all", overwrite: true})
                }
            }, '-=.2')
        })

        item.addEventListener('mouseleave', (e) => {  
            e.preventDefault();
            e.stopPropagation();
            document.querySelector(item_id + ' .card_footer .__footer_animate').classList.remove('hide')
            document.querySelector(item_id + ' .card_footer .card_hide').classList.add('hide')

            timeline.to(item_id + ' .card_footer .card_hide', {
                opacity: 0,
                duration: .3,
                y: '0%',
                onComplete(){
                    timeline.to(item_id + ' .card_footer .__footer_animate', {
                        opacity: 1,
                        duration: .3,
                        y: '0%',
                        ease: 'none',
                    }, '-=.2').to(item_id + ' .__header_animate', {
                        opacity: 1,
                        duration: .3,
                        y: '0%',
                        ease: 'none',
                    }, '-=.2')
                    gsap.set(item, {clearProps: "all", overwrite: true})
                }
            })
        })
    })
}

// slider images setup
const images = [
    "./img/work-1.jpg",
    "./img/work-2.jpg",
    "./img/work-3.jpg",
];

// slider content setup
const texts = [
    ["Find", "your dream job."],
    ["Save", "time and learn from the best."],
    ["Choose", "your creative space that will help you find inspiration."],
]

// slider
initSlider()

// loading animation
initGsapAnimation()

// card hover animation
initCardAnimation()