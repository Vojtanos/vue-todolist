<template>
  <header>
    <nav>
      <div class="name"><img class="logo" src="public/images/logo.png" alt="">Todo List</div>
      <ul>
        <li>
          <router-link to="/calendar">Kalendář</router-link>
        </li>
        <li>
          <router-link to="/users">Uživatelé</router-link>
        </li>
        <li>
          <router-link to="/tasks">Úkoly</router-link>
        </li>
        <li>
          <router-link to="/gamification">Gamifikace</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.logo{
  height: 32px;
}
.name {
  font-size: 30px;
  color: #0091ad;
  height: 100%;
  width: 260px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
header {
  height: 4rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(228, 228, 228);
  background:rgb(51,51,51);
  margin-bottom: 30px;
  
}
nav{
  width: 100%;
  max-width: 700px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
}
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  max-width: 700px;
  min-width: 500px;
  list-style-type: none;
  list-style: none;
  margin: 10px;
}
a{
  text-decoration: none;
  color: rgb(222, 222, 222);
  font-size: 17px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid transparent;
}
a:hover {
  color: rgb(255, 255, 255);
}
a.active {
  color: black;
  background: #0091ad;
  width: 50px;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: -20px;
  margin-right: -20px;
}
</style>