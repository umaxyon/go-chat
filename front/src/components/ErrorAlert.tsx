import React from 'react'


const MessageResources: { [k: string]: string } = {
    "user_name_too_long" : "ユーザー名は5文字までです",
    "user_already_exist" : "そのユーザー名はすでに使われています。別の名前でログインしてください",
}

type ErrorAlertProps = {
    errKey: string
}
const ErrorAlert: React.FC<ErrorAlertProps> = ({ errKey }) => {
    return errKey ? (
            <div className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center m-auto w-full h-12 mt-5" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                </svg>
                {MessageResources[errKey]}
            </div>
        ): <div className="h-12"></div>
}
export default ErrorAlert