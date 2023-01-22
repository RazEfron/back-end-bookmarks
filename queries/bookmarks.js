const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    return error;
  }
};

const getBookmark = async (id) => {
  try {
    const oneBookmark = await db.oneOrNone(
      "SELECT * FROM bookmarks WHERE id=$1",
      id
    );

    // another option to sanitize the SQL query
    // await db.one("SELECT * FROM bookmarks WHERE id=$[id]", {
    //   id: id,
    // });
    return oneBookmark;
  } catch (error) {
    return error;
  }
};

const createBookmark = async (bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  try {
    const newBookmark = await db.one(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [name, url, category, is_favorite]
    );
    return newBookmark;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBookmarks, getBookmark, createBookmark };
