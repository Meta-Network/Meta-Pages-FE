export interface DomainFindAPIParamsState {
  prefix: string
  limit: number
}

export interface DomainFindAPIResultState {
  'language': 'zh'
  'timezone': string
  'templateId': 4
  'domain': string
  'storeType': 'GITHUB'
  'storeProviderId': 70
  'cicdType': null
  'cicdProviderId': null
  'publisherType': 'GITHUB'
  'publisherProviderId': 1
  'cdnType': null
  'cdnProviderId': null
  'status': 'PUBLISHED'
  'id': number
  'createdAt': string
  'updatedAt': string
  'metaSpacePrefix': string
  'siteInfo': {
    'subtitle': string
    'description': string
    'author': string
    'keywords': [
      'MetaSpace'
    ]
    'favicon': string
    'id': number
    'createdAt': string
    'updatedAt': string
    'userId': number
    'title': string
  }
}
