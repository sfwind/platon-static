import { pget, ppost } from '../../../utils/request'

export function loadUserProfileInfo() {
  return pget('/rise/customer/profile')
}

export function submitProfileInfo(param) {
  return ppost('/rise/customer/profile/certificate', param)
}

export function getCertificate(certificate) {
  return pget(`/rise/customer/certificate/${certificate}`)
}

export function getRegions() {
  return pget(`/rise/customer/region`)
}

export function getCertificateAndNextNo(certificate) {
  return pget(`/rise/customer/certificate/download/${certificate}`)
}

export function updateCertificateDownloadTime(certificate) {
  return pget(`/rise/customer/certificate/download/success/${certificate}`)
}

export function convertBase64ToFile(baseParam) {
  return ppost(`/rise/customer/certificate/convert`, baseParam)
}
