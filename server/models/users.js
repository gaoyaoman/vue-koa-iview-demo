const theDatabase = require('../config/db.js').theDb;
const userSchema = theDatabase.import('../schema/users.js');

// 通过表（users）中用户ID（user_id）查找
const getUserById = async function(id) {
  const userInfo = await userSchema.findOne({
    where: {
      user_id: id
    }
  });
  return userInfo
}

//查询表（users）中所有用户信息
const getUserList = async function() {
  return await userSchema.findAndCount(); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
}
//根据id修改密码
const updatePass = async (user_id, user_password) => {
    await userSchema.update(
        {
            user_password
        },
        {
            where: {
                user_id
            }
        }
    );
    return true;
}
//根据user_id 修改user_role
const updateRole = async (user_id, user_role) => {
  await userSchema.update(
    {
      user_role
    },
    {
      where: {
        user_id
      }
    }
  );

  return true;
}
//删除user_id 的信息
const delUser = async (user_id) => {
  await userSchema.destroy(
    {
      where: {
        user_id
      }
    }
  );
  return true;
}

const addUser = async (user_id,user_name,user_password,user_role) => {
  await userSchema.create({
    user_id,
    user_name,
    user_password,
    user_role
  });
  return true;
}
module.exports = {
  getUserById,
  getUserList,
  updatePass,
  updateRole,
  delUser,
  addUser
}
