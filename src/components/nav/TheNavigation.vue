<template>
  <header>
    <nav>
      <div class="name">Todo list</div>
      <ul>
        <li>
          <router-link to="/calendar">
            Kalendář
          </router-link>
        </li>
        <li>
          <router-link to="/users">Uživatelé</router-link>
        </li>
        <li>
          <router-link to="/tasks">Úkoly</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.name {
  font-size: 30px;
  color: rgb(255, 148, 148);
  height: 100%;
  width: 130px;
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
  max-width: 400px;
  min-width: 300px;
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
a:hover,
a:active,
a.active {
  color: #ffadad;
  border: 1px solid #f391e377;
}
</style>