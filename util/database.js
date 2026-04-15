import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  try {
    await database.execAsync("PRAGMA journal_mode = WAL;");
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )
    `);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw new Error(`Database initialization failed: ${error.message}`);
  }
}

export async function insertPlace(place) {
  const { title, imageUri, address, location } = place;

  if (!title || !imageUri || !address || !location?.lat || !location?.lng) {
    throw new Error("Invalid place data: all fields are required.");
  }

  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [title, imageUri, address, location.lat, location.lng],
    );
    return result;
  } catch (error) {
    console.error("Failed to insert place:", error);
    throw new Error(`Insert failed: ${error.message}`);
  }
}

export async function fetchPlaces() {
  try {
    const rows = await database.getAllAsync("SELECT * FROM places");

    return rows.map(
      (dp) =>
        new Place(
          dp.title,
          dp.imageUri,
          { address: dp.address, lat: dp.lat, lng: dp.lng },
          dp.id,
        ),
    );
  } catch (error) {
    console.error("Failed to fetch places:", error);
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

export async function fetchPlaceDetails(id) {
  if (!id) {
    throw new Error("Invalid id: id is required.");
  }

  try {
    const dbPlace = await database.getFirstAsync(
      "SELECT * FROM places WHERE id = ?",
      [id],
    );

    if (!dbPlace) {
      throw new Error(`Place with id ${id} not found.`);
    }

    return new Place(
      dbPlace.title,
      dbPlace.imageUri,
      { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
      dbPlace.id,
    );
  } catch (error) {
    console.error("Failed to fetch place details:", error);
    throw new Error(`Fetch details failed: ${error.message}`);
  }
}
