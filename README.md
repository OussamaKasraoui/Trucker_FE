# TO DO:
+ /src/scenes/contract/form.jsx
- Grab these from the pack specifications
    <MenuItem key={0} value={"syndic"}>{"Syndic"}</MenuItem>
    <MenuItem key={1} value={"adjoint"}>{"Adjoint"}</MenuItem>
    <MenuItem key={2} value={"tresorier"}>{"Tresorier"}</MenuItem>
    <MenuItem key={3} value={"members"}>{"Members"}</MenuItem>




# Usable:

### Date Provider
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/zh-cn';
<LocalizationProvider dateAdapter={AdapterDayjs}>
</LocalizationProvider>

### Formik Array
<Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, formik) => { mutation.mutate({values, formik}) }}
>
    {(formik) => (
        
        <FieldArray name={props.context}>
        {({ insert, remove, push }) => (
            <Form>
            </Form>
        )}
        </FieldArray>
    )}
</Formik>

<Grid item sx={{ width: "90%"}}>
    <Box display={"flex"}>
        {/* Decrement Instance */}
        { !props.done && (<IconButton 
            onClick={() => {
                const instancesCount = formik.values.buildings.length
                const instancesCurrent = instance
                const instancesNew = instancesCount - 1 === instancesCurrent ?
                                    instancesCurrent - 1 :
                                    instancesCurrent
                remove(instance)
                setInstance(instancesNew)
            }} 
            disabled={formik.values[props.context].length === 0}
        >
            <ClearIcon />
        </IconButton>)}
        {/* Button Stack */}
        <Box sx={{ width: "100%", overflow: "auto", whiteSpace: "nowrap" }}>
            <Stack direction="row" spacing={1}>
                {
                    formik.values.buildings.map((item, index) => (
                        <Button 
                            key={index} 
                            variant={index === instance ? "contained" : "outlined"} 
                            onClick={() => setInstance(index)}
                        >
                            { getIn(formik, `values.buildings.${instance}.buildingName`) || index}
                        </Button>
                    ))
                }
            </Stack>
        </Box>
        {/* Increment Instance */}
        { !props.done && (<IconButton 
            onClick={() => {
                push({
                    buildingSite: '',
                    buildingName: '',
                    buildingAddress: '',
                    buildingPrefix: '',
                    buildingFloors: '',
                    buildingAptPerFloor: ''
                });
                setInstance(formik.values.buildings.length);
            }} 
            // disabled={instance >= props.length - 1} // TODO: Limit the count of the instances based on the Pack properties 
        >
            <AddIcon />
        </IconButton>)}
    </Box>
</Grid>



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
