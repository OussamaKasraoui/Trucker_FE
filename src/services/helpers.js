export function compare2Objects(firstObject, secondObject){
    let equals = true

    Object.entries(firstObject).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);

        switch (typeof(value)){
                        
            case 'string' || 'number':
                equals *= value === secondObject[key]
            break;
                        
            case 'boolean':
                equals *= value === secondObject[key]
            break;
                            
            case 'object':
                if(Array.isArray(value) === Array.isArray(secondObject[key])){
                    // value is Array
                    equals *= compare2Arrays(value, secondObject[key])
                    
                }else{
                    // value is Object
                    equals *= JSON.stringify(value) === JSON.stringify(secondObject[key])
                }
            break;
                            
            default:
                console.log('========> compare2Objects didnt work :/')
            break;
                        
        }
    })

    return equals;
}


export function cloneObject(firstObject, secondObject, unifiedValue){
    
    let clonedObject = {}

    for (let key in firstObject) {
        // Check if the key exists in secondObject
        if (secondObject.hasOwnProperty(key)) {
            // Copy the key-value pair to clonedObject
            clonedObject[key] = typeof(unifiedValue) !== 'undefined' ? unifiedValue : secondObject[key];
        }
    }

    return clonedObject
}

export function compare2Arrays(firstArray, secondArray){
    let equals = true

    if(Array.isArray(firstArray) === Array.isArray(secondArray) 
    && firstArray.length === secondArray.length ){

        for (const index in firstArray) {
            console.log(`\n\ncompare2Arrays \nfirstArray[${index}]: ${firstArray[index]} , \nsecondArray[${index}]: ${secondArray[index]}\n\n`)

            switch (typeof(firstArray[index])){
                        
                case 'string' || 'number':
                    equals *= firstArray[index] === secondArray[index]
                break;
                                
                case 'object':
                    if(Array.isArray(firstArray[index]) === Array.isArray(secondArray[index]) ){
                        // firstArray[index] && firstArray[index] are Arrays
                        equals *= compare2Arrays(firstArray[index], secondArray[index])
                    }else{
                        // firstArray[index] && firstArray[index] are Objects
                        equals *= JSON.stringify(firstArray[index]) === JSON.stringify(secondArray[index])
                    }
                break;
                                
                default:
                    console.log('========> compare2Arrays didnt work :/')
                break;
                            
            }

        }

    }else{
        equals = false
    }

    return equals
}

export function updateArrayWhere(array2Update, keyIndex, condition, newValue){

    array2Update.forEach((element, index, originalArray) => {
        
        if(element[keyIndex] === condition){
            originalArray[index] = newValue
        }

    });

    return array2Update
}