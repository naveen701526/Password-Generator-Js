
// dom Element
const resultEl=document.getElementById( 'result' );
const lengthEl=document.getElementById( 'length' );
const uppercaseEl=document.getElementById( 'uppercase' );
const lowercaseEl=document.getElementById( 'lowercase' );
const numbersEl=document.getElementById( 'numbers' );
const symbolsEl=document.getElementById( 'symbols' );
const generateEl=document.getElementById( 'generate' );
const clipboardEl=document.getElementById( 'clipboard' );


// generate event listener

generateEl.addEventListener( 'click', () =>
{
    // @ts-ignore
    const length=+lengthEl.value;
    // @ts-ignore
    const hasLower=lowercaseEl.checked;
    // @ts-ignore
    const hasUpper=uppercaseEl.checked;
    // @ts-ignore
    const hasNumber=numbersEl.checked;
    // @ts-ignore
    const hasSymbol=symbolsEl.checked;
    resultEl.innerText=generatePassword( hasLower, hasUpper, hasNumber, hasSymbol, length );

} );

// copy password to clipoard
clipboardEl.addEventListener( 'click', () =>
{
    const textarea=document.createElement( 'textarea' );
    const password=resultEl.innerText;

    if ( !password )
    {
        return;
    }
    textarea.value=password;
    document.body.appendChild( textarea );
    textarea.select();
    document.execCommand( 'copy' );
    textarea.remove();
    alert( 'password copied to clipboard' );
} );



// generate password function
function generatePassword ( lower, upper, number, symbol, length )
{
    // initialise password variable
    // filter out unchecked types
    // loop over the length call a generator funtcion for each type
    //add final pw to the pw var and return

    let generatedPassword='';
    const typesCount=lower+upper+number+symbol;
    // console.log( typesCount );

    // @ts-ignore
    const typesArr=[ { lower }, { upper }, { number }, { symbol } ].filter( item => Object.values( item )[ 0 ] );
    // console.log( 'types array:', typesArr );

    if ( typesCount===0 )
    {
        return '';
    }
    for ( let i=0; i<length; i+=typesCount )
    {
        typesArr.forEach( type =>
        {
            // @ts-ignore
            let ran=[ { lower }, { upper }, { number }, { symbol } ];

            const funcName=Object.keys( ran[ Math.floor( Math.random()*4 ) ] )[ 0 ];
            generatedPassword+=randomFunc[ funcName ]();
        } );
    }
    const finalPassword=generatedPassword.slice( 0, length );
    return finalPassword;
}


const randomFunc={
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};



// generator functions

function getRandomLower ()
{
    return String.fromCharCode( Math.floor( Math.random()*26 )+97 );
}
function getRandomUpper ()
{
    return String.fromCharCode( Math.floor( Math.random()*26 )+65 );
}
function getRandomNumber ()
{
    return String.fromCharCode( Math.floor( Math.random()*10 )+48 );
}
function getRandomSymbol ()
{
    const symbols='!@#$%^&*(){}[]=<>/,.';
    return symbols[ Math.floor( Math.random()*symbols.length ) ];
}

