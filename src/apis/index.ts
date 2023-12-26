// axios의 인스턴스 구현체가 있고 전반적으로 instance를 이용해서 api 콜하는 함수들

import apiInstance from './instance.api';

const APIS = {
  // 아래는 예시
  getPosts: async () => {
    const { data } = await apiInstance.get('/posts');
    return data;
  },
};

export default APIS;
