import React, { useRef, useState, useMemo } from "react";
import UserList from "./ArrayRender/UserList";
import CreateUser from "./ArrayRender/CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중 ...");
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  });

  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true
    },
    {
      id: 2,
      username: "test",
      email: "public.test@gmail.com",
      active: false
    },
    {
      id: 3,
      username: "liz",
      email: "public.liz@gmail.com",
      active: false
    }
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
    // == setUsers(users.concat(user));

    setInputs({
      username: "",
      email: ""
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);
  //첫번째 파라미터 : 어떻게 연산할지 정의하는 함수
  //두번째 파라미터 : deps 배열 >> 이 배열안에 넣은 애용이 바뀌면,
  //                  우리가 등록했던 함수를 호출에서 값을 연산해주고,
  //                  만약 내용이 바뀌지 않았다면 이전에 값을 재사용.

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
