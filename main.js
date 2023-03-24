
function Users(options)
{
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formE = document.querySelector(options.form);
    console.log(formE);
  
    if(formE)
    {
        formE.onsubmit = function(e)
        {
       

            options.rules.forEach(function(rule){
                var InputElement = formE.querySelector(rule.selector);
                console.log(InputElement);

                var errorMessage = rule.test(InputElement.value);
                var errorElement = getParent(InputElement, options.formGroupSelector).querySelector('.form-message');
                if(errorMessage)
                {
                    errorElement.innerText = errorMessage;
                    InputElement.parentElement.classList.add('invalid')
                }
                else 
                {
                    errorElement.innerText = '';
                }
            });

        }



        options.rules.forEach(function (rule)  {

           var InputElement = formE.querySelector(rule.selector);
           console.log(InputElement);

           if(InputElement)
           {
               InputElement.onblur = function()
               {

                var errorMessage = rule.test(InputElement.value);
                var errorElement = getParent(InputElement, options.formGroupSelector).querySelector('.form-message');
                if(errorMessage)
                {
                    errorElement.innerText = errorMessage;
                    InputElement.parentElement.classList.add('invalid')
                }
                else 
                {
                    errorElement.innerText = '';
                }
                
               }
               InputElement.oninput = function()
                {
                    var errorElement = getParent(InputElement, options.formGroupSelector).querySelector('.form-message');
                    errorElement.innerText = '';
                }
           }
            
        });
    }


}
Users.isRequired = function (selector) 
{

    return {
        selector: selector,
        test: function(value)
        {
            return value ? undefined : "Vui long nhap lai ten";
        }
    };
   


}


Users.isEmail = function(selector)
{
    return {
        selector: selector,
        test: function(value)
        {

            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Vui long nhap lai email";
            
        }
    };
}
Users.isPassword = function (selector, min) 
{

    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}
Users.isConfirmPassword = function (selector, Confirm) 
{

    return {
        selector: selector,
        test: function (value) {
            return value === Confirm() ? undefined : "Mat khau nhap lai chua dung";
        }
    };
} 

     var cmtApi =  'http://localhost:3000/comments';

     function Start()
     {
        Getcomment(RenderComment);
        handleComment();

     }
     Start();

    function creatcmt(data, callback)
    {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            callback();
          })
          .catch(function(error) {
            console.error(error);
          });
      
        
    }


     function Getcomment(callback)
     {
        fetch(cmtApi)
        .then(function(response){
            return response.json();

        })
        .then(callback);
     }

     function RenderComment(comments)
     {
        var ListComment = document.querySelector('#list-comment');
        var htmls = comments.map(function(comment)
        {
            return`
            <li>
               <p>  ${comment.id} </p>
               <h4> ${comment.body} </h4>
            </li>
            `;
        });
        ListComment.innerHTML = htmls.join('');
     }
     function handleComment() {
        var submitBtn = document.getElementById('ok');
        submitBtn.onclick = function() {
          var comment = document.querySelector('input[name="cmt"]').value;
          var formData = {
            body: comment
          };
          creatcmt(formData, function()
          {
            Getcomment(RenderComment);
          });
        }
      }
      
      
      