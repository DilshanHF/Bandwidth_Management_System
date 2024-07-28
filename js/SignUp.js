document.getElementById('Sign-Up').addEventListener('click',function(){



    const email = document.getElementById('email').value;
    const Username = document.getElementById('Username').value;
    const password = document.getElementById('password').value;
    const password1 = document.getElementById('password1').value;

    if (validate(email,'Email') && validate(Username,'User Name') &&
        validate(password,'Password') && validate(password1,'Confirm Password')) {

          if (password !== password1){
            Swal.fire({
                icon: 'error',
                title: 'Password does not match',
            })
              return;
        }
         const data = {email, Username, password}

          fetch('/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)

          })
              .then(res => res.json())
              .then(data => {
                  if (data.success) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Sign Up Successful',
                      })
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Sign Up Failed',
                      })
                  }
              })
          .catch(err => {
              console.log(err);
          });

    }
});


function validate(value, field_name){
    if(!value){
        Swal.fire({
            icon: 'Warning',
            title: 'Please enter '+ field_name


        });
        return false;
    }else{
        return true;
    }
}