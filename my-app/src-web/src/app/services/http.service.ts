
import { Injectable } from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'

// import {ModalService} from '../../bs-common-module/services/modal.service'
import {NotificationService} from './notification.service'



const removeEmptyProperty = ( source : any) => {

    const sourceTemp = JSON.parse(JSON.stringify(source))

    function removeEmptyKeys (sourceObject : any) {
        if ( typeof sourceObject === 'object' && sourceObject && !Array.isArray(sourceObject)) {
            for (const prop in sourceObject) {
                if (sourceObject.hasOwnProperty(prop)) {

                    if ( typeof sourceObject[prop] === 'object' &&  sourceObject[prop] && !Array.isArray(sourceObject[prop])) {

                        if (Object.keys(sourceObject[prop]).length > 0 ) {
                            removeEmptyKeys (sourceObject[prop])
                        }

                        if (Object.keys(sourceObject[prop]).length === 0 ) {
                            // console.log('Property: ', prop, sourceObject[prop])
                            delete sourceObject[prop]
                        }

                    }else if ( Array.isArray(sourceObject[prop]) && sourceObject[prop].length === 0 ) {
                        delete sourceObject[prop]

                    }else if ( typeof sourceObject[prop] === 'number' && sourceObject[prop] === 0 ) {
                        delete sourceObject[prop]

                    }else if ( !sourceObject[prop] ) {
                        delete sourceObject[prop]
                    }
                }
            }
        }
    }

    removeEmptyKeys(sourceTemp)

    return sourceTemp
}




@Injectable()
class HttpService {

    constructor(
        private notificationService: NotificationService
    ) {
        // console.log(modalService)
    }

    errorHandler (error: HttpErrorResponse) {

        if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Observable 发生前端错误!! ', error.error.message)
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Observable 发生后端请求错误!! ${error.status}, body was: ${error.error}`)

            if (error && error.status === 401 ) {

                if ( error.url.indexOf('api/login') === -1) {
                    window.location.href = '/web/login'
                } else {
                    this.notificationService.error( '登陆失败!',  '用户名或密码错误',
                        {
                            showProgressBar: false,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 5000
                        }
                    )
                }

            } else {
                if (error && error.status === 400) {
                    console.log('Http 400 请求发生错误!! ', error.error || error.message)

                } else if (error && error.status === 404) {
                    console.log('Http 404 请求发生错误!! ', error.error || error.message)

                } else if (error && error.status === 500) {
                    console.log('Http 500 请求发生错误!! ', error.error || error.message)

                } else {
                    console.log('Http 请求发生错误!! ', error.error || error.message)
                }

/*
                this.modalService.showModal({
                    title : '请求出现错误!',
                    message : error.error.error.message
                })
*/

                let messageError = ''

                if (error && error.error && (error.error.success === false || error.error.success === true)) {

                    messageError = error.error.error.code + ': ' + error.error.error.message

                } else {
                    if (error && error.error && error.error.message) {
                        messageError = error.error.message
                    } else {
                        messageError = error.message
                    }
                }

                this.notificationService.error( '请求出现错误!',  messageError,
                    {
                        showProgressBar: false,
                        pauseOnHover: true,
                        clickToClose: true,
                        timeOut: 5000
                    }
                )
            }
        }
    }

    successHandler (data: any, message? : string) {
        this.notificationService.success(  message || '操作成功!', '提示: 点击后提示消失',
            {
                showProgressBar: false,
                pauseOnHover: true,
                clickToClose: true,
                timeOut: 3000
            }
        )
    }

    errorMessage (error: any, message? : string) {
        this.notificationService.error( message || '操作失败!', '提示: 点击后提示消失',
            {
                showProgressBar: false,
                pauseOnHover: true,
                clickToClose: true,
                timeOut: 5000
            }
        )
    }

}



export {HttpService, removeEmptyProperty}


