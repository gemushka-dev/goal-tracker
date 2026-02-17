const { pool } = require("./databasePool");

const allowedField = ["username", "user_img"];

class Database {
  constructor() {}

  async init() {
    const usersQuery = `
            CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(64) NOT NULL,
                user_email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                user_img TEXT DEFAULT 'default.png',
                created_at TIMESTAMP DEFAULT NOW()
            );
        `;
    const goalsQuery = `
            CREATE TABLE IF NOT EXISTS goals(
                goal_id SERIAL PRIMARY KEY,
                goal_title VARCHAR(128) NOT NULL,
                goal_content TEXT,
                status VARCHAR(8) DEFAULT 'private',
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),

                CONSTRAINT fk_user_goals FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
            );
        `;
    const commentsQuery = `
            CREATE TABLE IF NOT EXISTS comments(
                comment_id SERIAL PRIMARY KEY ,
                comment_text TEXT NOT NULL ,
                user_id INT NOT NULL,
                goal_id INT NOT NULL,
                parent_id INT NULL,
                created_at TIMESTAMP DEFAULT NOW(), 

                CONSTRAINT fk_user_comments FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                CONSTRAINT fk_goal_comments FOREIGN KEY(goal_id) REFERENCES goals(goal_id) ON DELETE CASCADE,
                CONSTRAINT fk_parent_comments FOREIGN KEY(parent_id) REFERENCES comments(comment_id) ON DELETE CASCADE
            );
    `;

    const likesQuery = `
            CREATE TABLE IF NOT EXISTS likes(
                like_id SERIAL PRIMARY KEY,
                goal_id INT NULL,
                comment_id INT NULL,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),

                CONSTRAINT fk_user_likes FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                CONSTRAINT fk_goal_likes FOREIGN KEY(goal_id) REFERENCES goals(goal_id) ON DELETE CASCADE,
                CONSTRAINT fk_comment_likes FOREIGN KEY(comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,

                CONSTRAINT chk_like_target
                CHECK (
                (goal_id IS NOT NULL AND comment_id IS NULL)
                OR
                (goal_id IS NULL AND comment_id IS NOT NULL)
                )
            );

            CREATE UNIQUE INDEX uniq_goal_like
            ON likes(user_id, goal_id)
            WHERE goal_id IS NOT NULL;

            CREATE UNIQUE INDEX uniq_comment_like
            ON likes(user_id, comment_id)
            WHERE comment_id IS NOT NULL;
    `;

    await pool.query(usersQuery);
    await pool.query(goalsQuery);
    await pool.query(commentsQuery);
    await pool.query(likesQuery);
  }

  async getAllUsers() {
    const query = `SELECT user_id ,username ,user_email,user_img ,created_at FROM users `;
    const result = await pool.query(query);
    return result.rows;
  }
  async getUserById(userId) {
    const query = `SELECT user_id ,username ,user_email,user_img ,created_at FROM users WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  async createUser({ username, userEmail, password, userImg }) {
    const query = `INSERT INTO users(username , user_email , password, user_img) VALUES($1,$2,$3, $4) RETURNING user_id , username, user_email , user_img , created_at`;
    const result = await pool.query(query, [
      username,
      userEmail,
      password,
      userImg,
    ]);
    return result.rows[0];
  }

  async updateUser(userId, objFieldsValues) {
    const values = Object.values(objFieldsValues);
    const fields = Object.keys(objFieldsValues);

    const setFields = [];
    let index = 1;
    for (const key of fields) {
      if (!allowedField.includes(key)) {
        throw new Error("Invalid Field");
      }

      setFields.push(`${key} = $${index}`);
      index++;
    }
    if (setFields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(userId);
    const query = `
      UPDATE users SET ${setFields.join(", ")} 
      WHERE user_id = $${index} 
      RETURNING user_id , username , user_email , user_img , created_at
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteUserById(userId) {
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING username`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE user_email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  async getAllGoals() {
    const query = "SELECT * FROM goals WHERE status = 'public' ";
    const result = await pool.query(query);
    return result.rows;
  }

  async getGoalsByUserId(userId) {
    const query = `SELECT * FROM goals WHERE user_id = $1 AND status = 'public' ORDER BY created_at DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async getAllGoalsByUserId(userId) {
    const query = `SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async getGoalById(goalId) {
    const query = `SELECT * FROM goals WHERE goal_id = $1 AND status = 'public'`;
    const result = await pool.query(query, [goalId]);
    return result.rows[0];
  }

  async createGoal({ goalTitle, goalContent, status, userId }) {
    const query = `INSERT INTO goals(goal_title ,goal_content,status ,user_id) VALUES($1,$2,$3,$4) RETURNING *`;
    const result = await pool.query(query, [
      goalTitle,
      goalContent,
      status,
      userId,
    ]);
    return result.rows[0];
  }

  async deleteGoal(goalId, userId) {
    const query = `DELETE FROM goals WHERE goal_id = $1 AND user_id = $2 RETURNING *`;
    const result = await pool.query(query, [goalId, userId]);
    return result.rows[0];
  }

  async getCommentsByGoalId(goalId) {
    const query = `SELECT * FROM comments WHERE goal_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [goalId]);
    return result.rows;
  }

  async getCommentsByCommentId(parentId) {
    const query = `SELECT * FROM comments WHERE parent_id = $1 ORDER BY created_at ASC`;
    const result = await pool.query(query, [parentId]);
    return result.rows;
  }

  async getCommentById(commentId) {
    const query = `SELECT goal_id FROM comments WHERE comment_id = $1`;
    const result = await pool.query(query, [commentId]);
    return result.rows[0];
  }

  async createCommentToGoal({ commentText, userId, goalId }) {
    const query = `INSERT INTO comments(comment_text,user_id,goal_id) VALUES($1,$2,$3) RETURNING *`;
    const result = await pool.query(query, [commentText, userId, goalId]);
    return result.rows[0];
  }

  async createCommentToComment({ commentText, userId, goalId, parentId }) {
    const query = `INSERT INTO comments(comment_text,user_id,goal_id, parent_id) VALUES($1,$2,$3,$4) RETURNING *`;
    const result = await pool.query(query, [
      commentText,
      userId,
      goalId,
      parentId,
    ]);
    return result.rows[0];
  }

  async deleteComment(commentId, userId) {
    const query = `DELETE FROM comments WHERE comment_id = $1 AND user_id = $2 RETURNING *`;
    const result = await pool.query(query, [commentId, userId]);
    return result.rows[0];
  }

  async getGoalLikes(goalId) {
    const query = `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE goal_id = $1`;
    const result = await pool.query(query, [goalId]);
    return result.rows[0];
  }

  async getCommentLikes(commentId) {
    const query = `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE comment_id = $1`;
    const result = await pool.query(query, [commentId]);
    return result.rows[0];
  }

  async createGoalLike({ userId, goalId }) {
    const query = `INSERT INTO likes(user_id , goal_id) VALUES($1,$2)`;
    try {
      await pool.query(query, [userId, goalId]);
    } catch (e) {
      if (e.code == "23505") {
        return await this.deleteGoalLike(userId, goalId);
      }
      throw e;
    }
    const result = await pool.query(
      `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE goal_id = $1`,
      [goalId],
    );
    return result.rows[0];
  }

  async createCommentLike({ userId, commentId }) {
    const query = `INSERT INTO likes(user_id , comment_id) VALUES($1,$2) `;
    try {
      await pool.query(query, [userId, commentId]);
    } catch (e) {
      if (e.code == "23505") {
        return await this.deleteCommentLike(userId, commentId);
      }
      throw e;
    }
    const result = await pool.query(
      `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE comment_id = $1`,
      [commentId],
    );
    return result.rows[0];
  }

  async deleteGoalLike(userId, goalId) {
    const query = `DELETE FROM likes WHERE user_id = $1 AND goal_id = $2`;
    await pool.query(query, [userId, goalId]);
    const result = await pool.query(
      `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE goal_id = $1`,
      [goalId],
    );
    return result.rows[0];
  }

  async deleteCommentLike(userId, commentId) {
    const query = `DELETE FROM likes WHERE user_id = $1 AND comment_id = $2`;
    await pool.query(query, [userId, commentId]);
    const result = await pool.query(
      `SELECT COUNT(like_id)::int AS likes_count FROM likes WHERE comment_id = $1`,
      [commentId],
    );
    return result.rows[0];
  }
}

const database = new Database();

module.exports = database;
