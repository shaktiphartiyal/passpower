/**
 * @Author Shakti Phartiyal
 * @Created 15/03/2017
 * @Desc Password strength checker and generator
 */
'use strict';
(function(Ψ){
    Ψ = {
        options:{
            selector:null,
            strengthDisplay:"border" //border inside
        },
        __proto__:{
            curConfig:[],
            curConfigIndex:-1,
            strengthChecker:function(options){
                var i;
                Element.prototype.remove = function() {
                    this.parentElement.removeChild(this);
                };
                NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
                    for(i = this.length - 1; i >= 0; i--)
                    {
                        if(this[i] && this[i].parentElement)
                        {
                            this[i].parentElement.removeChild(this[i]);
                        }
                    }
                };
                if(!Ψ.makeConfig(options))
                {
                    return;
                }
                if(Ψ.curConfig[Ψ.curConfigIndex].selector == null)
                {
                    console.warn("Selector Missing");
                }
                if(Ψ.curConfig[Ψ.curConfigIndex].selector.charAt(0) == ".")
                {
                    Ψ.curConfig[Ψ.curConfigIndex].selector = Ψ.curConfig[Ψ.curConfigIndex].selector.substr(1);
                    var elem = document.getElementsByClassName(Ψ.curConfig[Ψ.curConfigIndex].selector);
                    for(i = 0;i < elem.length; i++)
                    {
                        Ψ.makeStrengthChecker(elem[i]);
                        elem.remove();
                    }
                }
                else if(Ψ.curConfig[Ψ.curConfigIndex].selector.charAt(0) == "#")
                {
                    Ψ.curConfig[Ψ.curConfigIndex].selector = Ψ.curConfig[Ψ.curConfigIndex].selector.substr(1);
                    var e = document.getElementById(Ψ.curConfig[Ψ.curConfigIndex].selector);
                    Ψ.makeStrengthChecker(e);
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
            makeStrengthChecker:function(elem){
                var w = elem.clientWidth;
                var n = elem.name;
                var id = elem.id;
                elem.style.display = "none";
                elem.outerHTML = Ψ.getDesign(w,n,id);
            },
            getDesign:function(width,name,id){
                var wrapper;
                switch(Ψ.curConfig[Ψ.curConfigIndex].strengthDisplay){
                    case "border":
                        wrapper = '<div style="width:'+width+'px;overflow:hidden;"><div style="position: relative;padding:3px;border:1px solid grey;border-radius:3px;"><span style="height:100%;width:0;position:absolute;top:0;left:0;z-index:1;transition:all 1s ease-in-out;"></span><input style="display:block;width:100%;box-sizing: border-box;position:relative;z-index:2;padding:3px;border:0;border-radius:3px;outline: none;" type="password" id="'+id+'" name="'+name+'" class="passwordPowerBox" /></div></div>';
                        break;
                    case "inside":
                        wrapper = '<div style="width:'+width+'px;"><div style="position: relative;padding:3px;border:1px solid grey;border-radius:3px;"><span style="height:100%;opacity:0.5;width:0;position:absolute;top:0;left:0;z-index:1;transition:all 1s ease-in-out;"></span><input style="display:block;width:100%;box-sizing: border-box;position:relative;z-index:1;padding:3px;border:0;border-radius:3px;outline: none;background-color: transparent;" type="password" id="'+id+'" name="'+name+'" class="passwordPowerBox" /></div></div>';
                        break;
                    default:
                        wrapper = '<div style="width:'+width+'px;overflow:hidden;"><div style="position: relative;padding:3px;border:1px solid grey;border-radius:3px;"><span style="height:100%;width:0;position:absolute;top:0;left:0;z-index:1;transition:all 1s ease-in-out;"></span><input style="display:block;width:100%;box-sizing: border-box;position:relative;z-index:2;padding:3px;border:0;border-radius:3px;outline: none;" type="password" id="'+id+'" name="'+name+'" class="passwordPowerBox" /></div></div>';
                }
                return wrapper;
            },
            cloneObj:function(obj){
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            },
            makeConfig:function(options){
                Ψ.curConfigIndex++;
                Ψ.curConfig[Ψ.curConfigIndex] = Ψ.cloneObj(Ψ.options);
                if(typeof(options) == "undefined")
                {
                    return true;
                }
                if(typeof(options) != "object")
                {
                    console.warn("Options need to be passed as object");
                    return false;
                }
                for (var key in options)
                {
                    Ψ.curConfig[Ψ.curConfigIndex][key] = options[key];
                }
                return true;
            }
        }
    };
    window.passPower = Ψ;
})();