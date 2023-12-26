// 이 파일은 예시 입니다.
// 최초의 다른 api가 추가되면 이 파일은 삭제될 예정입니다.
import apiInstance from './instance.api';

const POST_APIS = {
  getPosts: async () => {
    const { data } = await apiInstance.get('/posts');
    return data;
  },
};

export default POST_APIS;
