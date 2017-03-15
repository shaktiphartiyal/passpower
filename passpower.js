/**
 * @Author Shakti Phartiyal
 * @Created 15/03/2017
 * @Desc Password strength checker and generator
 */
'use strict';
(function(Ψ){
    Ψ = {
        options:{
            selector:null
        },
        __proto__:{
            strengthChecker:function(options){
                Element.prototype.remove = function() {
                    this.parentElement.removeChild(this);
                }
                NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
                    for(var i = this.length - 1; i >= 0; i--) {
                        if(this[i] && this[i].parentElement) {
                            this[i].parentElement.removeChild(this[i]);
                        }
                    }
                }
                var i;
                for (var key in options)
                {
                    Ψ.options[key] = options[key];
                }
                if(Ψ.options.selector == null)
                {
                    console.warn("Selector Missing");
                }
                if(Ψ.options.selector.charAt(0) == ".")
                {
                    Ψ.options.selector = Ψ.options.selector.substr(1);
                    var elem = document.getElementsByClassName(Ψ.options.selector);
                    for(i = 0;i < elem.length; i++)
                    {
                        Ψ.setCustomDesign(elem[i]);
                        elem.remove();
                    }
                }
                else if(Ψ.options.selector.charAt(0) == "#")
                {
                    Ψ.options.selector = Ψ.options.selector.substr(1);
                    var e = document.getElementById(Ψ.options.selector);
                    Ψ.setCustomDesign(e);
                }
                else
                {
                    console.warn("No selector Found !");
                    return;
                }
                for(i=0 ; i< document.getElementsByClassName('passwordPowerBox').length; i++)
                {
                    document.getElementsByClassName('passwordPowerBox')[i].addEventListener('input',function(){
                        Ψ.showStrength(this);
                    });
                }
            },
        },
        showStrength:function(elem){
            var strength = 0;
            var color;
            var passwd = elem.value;

            strength = (strength + passwd.length);
            if (passwd.match(/[a-z]/)) {
                strength = (strength + 15);
            }
            if (passwd.match(/[A-Z]/)) {
                strength = (strength + 12);
            }
            if (passwd.match(/\d+/)) {
                strength = (strength + 15);
            }
            if (passwd.match(/(\d.*\d)/)) {
                strength = (strength + 10);
            }
            if (passwd.match(/[!,@#$%^&*?_~]/)) {
                strength = (strength + 15);
            }
            if (passwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) {
                strength = (strength + 15);
            }
            if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/)) {
                strength = (strength + 10);
            }
            if (passwd.match(/\d/) && passwd.match(/\D/)) {
                strength = (strength + 10);
            }
            if (passwd.match(/[a-z]/) && passwd.match(/[A-Z]/) && passwd.match(/\d/) && passwd.match(/[!,@#$%^&*?_~]/)) {
                strength = (strength + 10);
            }

            if(strength > 100)
            {
                strength = 100;
            }

            if(strength > 0 && strength <= 20)
            {
                color = "#ff0000";
            }
            else if(strength > 20 && strength <= 40)
            {
                color = "#e6da1c";
            }
            else if(strength > 40 && strength <= 60)
            {
                color = "#c4e85e";
            }
            else if(strength > 60)
            {
                color = "#00ff00";
            }
            elem.parentNode.childNodes[0].style.backgroundColor = color;
            elem.parentNode.childNodes[0].style.width = strength+"%";
        },
        setCustomDesign:function(elem){
            var w = elem.clientWidth;
            var name = elem.name;
            var id = elem.id;
            elem.style.display = "none";
            var wrapper = '<div style="width:'+w+'px;overflow:hidden;"><div style="position: relative;padding:3px;border:1px solid grey;border-radius:3px;"><span style="height:100%;width:0;position:absolute;top:0;left:0;z-index:1;transition:all 1s ease-in-out;"></span><input style="display:block;width:100%;box-sizing: border-box;position:relative;z-index:2;padding:3px;border:0;border-radius:3px;outline: none;" type="password" id="'+id+'" name="'+name+'" class="passwordPowerBox" /></div></div>';
            elem.outerHTML = wrapper;
        },

    };
    window.passPower = Ψ;
})();