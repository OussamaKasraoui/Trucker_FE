import * as Yup             from 'yup';
import { updateFormValue }  from '@states/slices/formSlice';
import { compare2Objects, 
         cloneObject, 
         updateArrayWhere } from '@services/helpers';


// Dynamic Component form Fields
function contextFields(context, dependency, defaultID){
        
    switch (context) {
        case 'sites':
            return {
                bulk :  false,
                type: "form", 
                dependency: [{id: 'Simple', name:'Simple'}, {id: 'Complex', name: 'Complex'}], //context.dependency,
                fields: {
                    siteName:               { type: "string", required: "siteName",             default: null,                  enum: null },
                    siteDetails:            { type: "string", required: "siteDetails",          default: null,                  enum: null },
                    siteAddress:            { type: "string", required: "siteAddress",          default: null,                  enum: null },
                    siteCity:               { type: "string", required: "siteCity",             default: null,                  enum: null },
                    sitePrefix:             { type: "string", required: "sitePrefix",           default: null,                  enum: null },
                    siteType:               { type: "select", required: "siteType",             default: "Simple",              enum: [{id: 'Simple',  name:'Simple'}, 
                                                                                                                                       {id: 'Complex', name: 'Complex'}] },
                }
            };
        case 'buildings':
            return {
                bulk :  true,
                type: "form",
                dependency: dependency ? dependency : [],
                fields: {
                    buildingSite:           { type: "select", required: "buildingSite",         default: "Select",              enum: dependency["buildingSite"] ? dependency["buildingSite"] : [] },
                    buildingName:           { type: "string", required: "buildingName",         default: null,                  enum: null },
                    buildingAddress:        { type: "string", required: "buildingAddress",      default: null,                  enum: null },
                    buildingPrefix:         { type: "number", required: "buildingPrefix",       default: null,                  enum: null },
                    buildingFloors:         { type: "number", required: "buildingFloors",       default: null,                  enum: null },
                    buildingAptPerFloor:    { type: "number", required: "buildingAptPerFloor",  default: null,                  enum: null },
                }
            };
        case 'apartments':
            return {
                bulk :  false,
                type: "form",
                dependency: dependency ? dependency : [],
                fields: {
                    apartmentBuilding:      { type: "select", required: "apartmentBuilding",    default: "Select",              enum: dependency["apartmentBuilding"] ? dependency["apartmentBuilding"] : [] },
                    apartmentType:          { type: "select", required: "apartmentType",        default: "Property",            enum: [{id: 'Rental', name: 'Rental'}, {id: 'Property', name: 'Property'}] },
                    apartmentNumber:        { type: "number", required: "apartmentNumber",      default: null,                  enum: null },
                    apartmentEtage:         { type: "number", required: "apartmentEtage",       default: null,                  enum: null },
                    apartmentUser:          { type: "default",required: "apartmentUser",        default: defaultID,             enum: null },
                }
            };
        case 'users':
            return {
                bulk :  false,
                type: "form",
                dependency: dependency ? dependency : [],
                fields: {
                    userFirstName:          { type: "string", required: "userFirstName",        default: "Select",              enum: null },
                    userLastName:           { type: "string", required: "userLastName",         default: "Select",              enum: null },
                    userAddress:            { type: "string", required: "userAddress",          default: "Property",            enum: [{id: 'Rental', name: 'Rental'}, {id: 'Property', name: 'Property'}] },
                    userPhone:              { type: "string", required: "userPhone",            default: "Property",            enum: [{id: 'Rental', name: 'Rental'}, {id: 'Property', name: 'Property'}] },
                    userEmail:              { type: "string", required: "userEmail",            default: null,                  enum: null },
                    userPassword:           { type: "string", required: "userPassword",         default: null,                  enum: null },
                    userPack:               { type: "number", required: "userPack",             default: null,                  enum: null },
                    userStatus:             { type: "number", required: "userStatus",           default: null,                  enum: null },
                }
            };
        case 'staff':
            return {
                key: ''
            };
        case 'contractors':
            return {
                key: ''
            };
        case 'contracts':
            return {
                bulk :  false,
                dependency: dependency ? dependency : [],
                fields: {
                    dividerT:               { type: "divider",required: "agreementInterval",    default: "Agreement Interval",  enum: null },
                    agreementTerm:          { type: "select", required: "agreementTerm",        default: "Select",              enum: [ { id: 'half-yearly',  name: 'Half-yearly' },
                                                                                                                                        { id: 'quarterly',    name: 'Quarterly' },
                                                                                                                                        { id: 'annually',     name: 'Annually' },
                                                                                                                                        { id: 'custom',       name: 'Custom' },] },
                    start_date:             { type: "date",   required: "start",                default: null,                  enum: null },
                    end_date:               { type: "date",   required: "end",                  default: null,                  enum: null },
                    
                    dividerM:               { type: "divider",required: "agreementBoardMembers",     default: "Agreement Members",   enum: null },
                    agreementBoardMembers:       { type: "select", required: "agreementBoardMembers",     default: "Select",              enum: [ { id: 'syndic',       name: 'Syndic' },
                                                                                                                                        { id: 'adjoint',      name: 'Adjoint' },
                                                                                                                                        { id: 'tresorier',    name: 'Tresorier' },
                                                                                                                                        { id: 'members',      name: 'Member' },] },

                    dividerS:               { type: "divider",required: "agreementServices",    default: "Agreement Services",  enum: null },
                    name:            { type: "string",        required: "name",                 default: null,                  enum: null },
                    type:            { type: "string",        required: "type",                 default: null,                  enum: null },
                    cost:            { type: "string",        required: "cost",                 default: null,                  enum: null },
                }
            };
        case 'tasks':
            return {
                key: ''
            };
        case 'paiments':
            return {
                key: ''
            };
        case 'information':
            return {
                bulk :  false,
                type: "information",
                dependency: dependency ? dependency : [],
                fields: {
                    title:                  { type: "text",   required: "title",                default: "h1",                  enum: dependency["title"] ? dependency["title"] : [] },
                    header:                 { type: "text",   required: "header",               default: "h2",                  enum: dependency["header"] ? dependency["header"] : [] },
                    body:                   { type: "text",   required: "body",                 default: "h2",                  enum: dependency["body"] ? dependency["body"] : [] },
                    footer:                 { type: "text",   required: "footer",               default: "h2",                  enum: dependency["footer"] ? dependency["footer"] : [] },
                    data:                   { type: "text",   required: "data",                 default: "link",                enum: dependency["data"] ? dependency["data"] : [] },
                }
            };
        default:
            return {
                key: ''
            };
    }
};

// Dynamic formik initial Values
export function InitFormik(context, values, dependency, done, action, dispatch, t, userID){
    
    var initFormFields = [{}]
    var initValue = [{}]

    var initYup = {}
    var tmp = {}
    var yp = null
    var template = {}

    if(done && values.length){
        initFormFields = contextFields(context, dependency, userID)
        initValue = values.map(obj => {return cloneObject(initFormFields.fields, obj)})
        dispatch(updateFormValue({ context: context, values: initValue }))

    }else{

        if(action === "information"){
            initFormFields = contextFields(action, dependency, userID)
            initValue = values
        }else{

            initFormFields = contextFields(context, dependency, userID)
            // initValue = [{}]
            for (const [fieldKey, fieldValue] of Object.entries(initFormFields.fields)) {

                switch (fieldValue?.type) {
                    case "default":                        
                        initValue[0][fieldKey] = fieldValue.default
                        tmp[fieldKey] = Yup.string().required(t(fieldValue.required))
                    break;

                    case "string":                        
                        initValue[0][fieldKey] = ""
                        template[fieldKey] = ""
                        tmp[fieldKey] = Yup.string().required(t(fieldValue.required))
                    break;

                    case "number":
                        initValue[0][fieldKey] = "0"
                        template[fieldValue] = "0"
                        tmp[fieldKey] = Yup.number().required(t(fieldValue.required))
                    break;

                    case "select":
                        initValue[0][fieldKey]  = fieldValue.default
                        template[fieldKey]      = fieldValue.default
                        let test                = [] 
                        fieldValue.enum.map((item, index) => {
                            test.push(item.id)
                            test.push(item.name)
                        })
                        tmp[fieldKey] = Yup.string().required(t(fieldValue.required)).oneOf(test, t(`${fieldValue.required}SelectError`))
                    break;

                    case "text":                        
                            initValue[0][fieldKey] =  values[0][fieldKey]
                    break;

                    case "divider":
                    break;

                    case "date":                        
                        initValue[0][fieldKey]  = "values[0][fieldKey]"
                        
                        if(fieldKey === "start_date"){
                            tmp[fieldKey] = Yup.date().required(t(fieldValue.required))
                        }else{
                            tmp[fieldKey] = Yup.date().required(t(fieldValue.required)).min(Yup.ref("start_date"), "End date must be before Start date")
                        }
                    break;

                    case "Toggle":                        
                        initValue[0][fieldKey] =  "values[0][fieldKey] = values[0]["
                    break;
                }
            }

        }

    }

    initYup = Yup.array().of(Yup.object().shape(tmp))
    return { 
        initFormFields: initFormFields, 
        template:       template, 
        initValue:      initValue,
        initYup:        initYup,
        action:         action
    }    
}