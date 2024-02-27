import axios from 'axios';

const apiUrl = 'http://193.149.190.120:8080/';
//Добавить локалсторэдж
export const login = async (email:string, password:string) => {
    const postData={email:email, password:password};
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
    try {
        const response = await axios.post(apiUrl + 'api/v1/auth/login', postData, config);
        // Обработка успешного ответа
        console.log('Данные успешно отправлены:', response.data);
        return response.data;
    } catch (error) {
        // Обработка ошибки
        console.error('Ошибка запроса:', error);
        throw error; // Переброс ошибки, чтобы обработать ее в вызывающем коде
    }
}
export const registration = async (email:string,  
                                  password:string) => {
  const postData={email:email, password:password};
  const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };
  axios.post(apiUrl+'api/v1/auth/register ', postData, config)
      .then(response => {
      // Обработка успешного ответа
      console.log('Пользователь зареган!!!', response.data);
      })
      .catch(error => {
      // Обработка ошибки
      console.error('Ошибка запроса:', error);
  });
}

export const getInfoUser = async(id:number)=>{

}