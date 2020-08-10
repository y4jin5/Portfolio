// by Haidar Hammoud haidar.hmd1@gmail.com

//////////////// Default Style ////////////////////

// left slider
jQuery.fn.leftSlideDefault = function(backcolor, buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-left' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style default'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-left").css({"right": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-left").css({"right": 100 + "%"});
    });
};

// down slider
jQuery.fn.downSlideDefault = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-down' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style default'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-down").css({"bottom": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-down").css({"bottom": 100 + "%"});
    });
};

// right slider
jQuery.fn.rightSlideDefault = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-right' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style default'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-right").css({"left": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-right").css({"left": 100+"%"});
    });
};

// bottom slider
jQuery.fn.upSlideDefault = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-up' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style default'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-up").css({"top": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-up").css({"top": 100+"%"});
    });
};



//////////////// Default Style ////////////////////




//////////////// Modern Style ////////////////////

// left slider
jQuery.fn.leftSlideStyle1 = function(backcolor, buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-left-style' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-1'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-left-style").css({"right": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-left-style").css({"right": 100 + "%"});
    });
};

// down slider
jQuery.fn.downSlideStyle1 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-down-style' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-1'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-down-style").css({"bottom": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-down-style").css({"bottom": 100 + "%"});
    });
};

// right slider
jQuery.fn.rightSlideStyle1 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-right-style' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-1'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-right-style").css({"left": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-right-style").css({"left": 100+"%"});
    });
};

// bottom slider
jQuery.fn.upSlideStyle1 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-up-style' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-1'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-up-style").css({"top": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-up-style").css({"top": 100+"%"});
    });
};



//////////////// Modern Style ////////////////////





//////////////// Modern Style 2 ////////////////////

// left slider
jQuery.fn.leftSlideStyle2 = function(backcolor, buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-left-style2' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-2'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-left-style2").css({"right": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-left-style2").css({"right": 100 + "%"});
    });
};

// down slider
jQuery.fn.downSlideStyle2 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).append("<div class='box-container-down-style2' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-2'>"+ buttonText +"</button><div>");

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-down-style2").css({"bottom": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-down-style2").css({"bottom": 100 + "%"});
    });
};

// right slider
jQuery.fn.rightSlideStyle2 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-right-style2' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-2'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-right-style2").css({"left": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-right-style2").css({"left": 100+"%"});
    });
};

// bottom slider
jQuery.fn.upSlideStyle2 = function(backcolor,buttonText){

    var element = $(this);

    var boxHeight = $(element).height();
    var boxWidth = $(element).width();

    $(this).css({"position": "relative", "overflow": "hidden"});

    $(this).append("<div class='box-container-up-style2' style='height:"+ boxHeight +"px; width: "+ boxWidth +"px; background:"+ backcolor +"'><button class='btn-style style-2'>"+ buttonText +"</button><div>");

    $(this).mouseenter(function(e){
        e.preventDefault();
            $(".box-container-up-style2").css({"top": 0});
    });

    $(this).mouseleave(function(e){
        e.preventDefault();
            $(".box-container-up-style2").css({"top": 100+"%"});
    });
};



//////////////// Modern Style 2 ////////////////////