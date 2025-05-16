import { graphql, HttpResponse } from 'msw'
import { otp as validOtp, session } from '../data'
import { ApiResponseStatus } from '@vaka-tech/common'

export const requestOtp = graphql.query('RequestOtp', ({ variables }) => {
  const { email } = variables

  if (!email.includes('@vaka.consulting')) {
    return HttpResponse.json({
      data: {
        requestOtp: {
          status: ApiResponseStatus.Failed,
          message: 'This email is registered yet. Please register first and then try again.',
        },
      },
    })
  }

  return HttpResponse.json({
    data: {
      requestOtp: {
        status: ApiResponseStatus.Success,
        message: 'Success',
      },
    },
  })
})

export const loginOtp = graphql.query('LoginOtp', ({ variables }) => {
  const { otp } = variables

  if (otp !== validOtp) {
    return HttpResponse.json({
      data: {
        loginOtp: {
          status: ApiResponseStatus.Failed,
          message: 'Invalid OTP',
        },
      },
    })
  }

  return HttpResponse.json({
    data: {
      loginOtp: {
        status: ApiResponseStatus.Success,
        message: 'Success',
        payload: session(0.5),
      },
    },
  })
})

export const loginWallet = graphql.query('LoginWallet', ({ variables }) => {
  const { walletSignature } = variables

  if (!walletSignature.signature) {
    return HttpResponse.json({
      data: {
        loginWallet: {
          status: 'FAILED',
          message: 'Invalid WalletSignature',
        },
      },
    })
  }

  return HttpResponse.json({
    data: {
      loginWallet: {
        status: ApiResponseStatus.Success,
        message: 'Success',
        payload: session(0.5),
      },
    },
  })
})

export const register = graphql.mutation('Register', ({ variables }) => {
  const { email, stake_address, key, signature, survey_items } = variables
  const hasCorrectEmail = email?.includes('@vaka.consulting')
  const hasSurveyItems = Object.keys(survey_items).length > 0

  let response = {}

  switch (true) {
    case stake_address && key && signature && hasSurveyItems:
      response = {
        data: {
          register: {
            status: ApiResponseStatus.Success,
            message: 'Success',
          },
        },
      }
      break
    case hasCorrectEmail && stake_address && hasSurveyItems:
      response = {
        data: {
          register: {
            status: ApiResponseStatus.Success,
            message: 'Success',
          },
        },
      }
      break
    default:
      response = {
        data: {},
        errors: {
          message: 'Invalid data supplied',
        },
      }
      break
  }

  return HttpResponse.json(response)
})
