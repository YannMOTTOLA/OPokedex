/* eslint-disable no-console */
import { sequelize } from "../models/index.js";
import { Pokemon } from "../models/pokemon.model.js";
import { Type } from "../models/type.model.js";
import { Team } from "../models/team.model.js";
import { User } from "../models/index.js";

async function seed() {
  const t = await sequelize.transaction();
  try {
    // ————————————————————————————————————————————————————————————
    // 1) TYPES
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Création des types...");
    const types = [
      { id: 1, name: "Acier", color: "aaaabb" },
      { id: 2, name: "Combat", color: "bb5544" },
      { id: 3, name: "Dragon", color: "7766ee" },
      { id: 4, name: "Eau", color: "3399ff" },
      { id: 5, name: "Électrik", color: "ffbb33" },
      { id: 6, name: "Feu", color: "ff4422" },
      { id: 7, name: "Glace", color: "77ddff" },
      { id: 8, name: "Insecte", color: "aabb22" },
      { id: 9, name: "Normal", color: "bbaabb" },
      { id: 10, name: "Plante", color: "77cc55" },
      { id: 11, name: "Poison", color: "aa5599" },
      { id: 12, name: "Psy", color: "ff5599" },
      { id: 13, name: "Roche", color: "bbaa66" },
      { id: 14, name: "Sol", color: "ddbb55" },
      { id: 15, name: "Spectre", color: "6666bb" },
      { id: 16, name: "Ténèbres", color: "665544" },
      { id: 17, name: "Vol", color: "6699ff" },
    ];
    await Type.bulkCreate(types, {
      transaction: t,
      updateOnDuplicate: ["name", "color"], // rend le seed rejouable
    });
    console.log("✅ Types créés\n");

    // ————————————————————————————————————————————————————————————
    // 2) POKÉMONS
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Création des pokémons...");
    const pokemons = [
      { id: 1, name: "Bulbizarre", hp: 45, atk: 49, def: 49, atk_spe: 65, def_spe: 65, speed: 45 },
      { id: 2, name: "Herbizarre", hp: 60, atk: 62, def: 63, atk_spe: 80, def_spe: 80, speed: 60 },
      { id: 3, name: "Florizarre", hp: 80, atk: 82, def: 83, atk_spe: 100, def_spe: 100, speed: 80 },
      { id: 4, name: "Salameche", hp: 39, atk: 52, def: 43, atk_spe: 60, def_spe: 50, speed: 65 },
      { id: 5, name: "Reptincel", hp: 58, atk: 64, def: 58, atk_spe: 80, def_spe: 65, speed: 80 },
      { id: 6, name: "Dracaufeu", hp: 78, atk: 84, def: 78, atk_spe: 109, def_spe: 85, speed: 100 },
      { id: 7, name: "Carapuce", hp: 44, atk: 48, def: 65, atk_spe: 50, def_spe: 64, speed: 43 },
      { id: 8, name: "Carabaffe", hp: 59, atk: 63, def: 80, atk_spe: 65, def_spe: 80, speed: 58 },
      { id: 9, name: "Tortank", hp: 79, atk: 83, def: 100, atk_spe: 85, def_spe: 105, speed: 78 },
      { id: 10, name: "Chenipan", hp: 45, atk: 30, def: 35, atk_spe: 20, def_spe: 20, speed: 45 },
      { id: 11, name: "Chrysacier", hp: 50, atk: 20, def: 55, atk_spe: 25, def_spe: 25, speed: 30 },
      { id: 12, name: "Papilusion", hp: 60, atk: 45, def: 50, atk_spe: 80, def_spe: 80, speed: 70 },
      { id: 13, name: "Aspicot", hp: 40, atk: 35, def: 30, atk_spe: 20, def_spe: 20, speed: 50 },
      { id: 14, name: "Coconfort", hp: 45, atk: 25, def: 50, atk_spe: 25, def_spe: 25, speed: 35 },
      { id: 15, name: "Dardargnan", hp: 65, atk: 80, def: 40, atk_spe: 45, def_spe: 80, speed: 75 },
      { id: 16, name: "Roucool", hp: 40, atk: 45, def: 40, atk_spe: 35, def_spe: 35, speed: 56 },
      { id: 17, name: "Roucoups", hp: 63, atk: 60, def: 55, atk_spe: 50, def_spe: 50, speed: 71 },
      { id: 18, name: "Roucarnage", hp: 83, atk: 80, def: 75, atk_spe: 70, def_spe: 70, speed: 91 },
      { id: 19, name: "Rattata", hp: 30, atk: 56, def: 35, atk_spe: 25, def_spe: 35, speed: 72 },
      { id: 20, name: "Rattatac", hp: 55, atk: 81, def: 60, atk_spe: 50, def_spe: 70, speed: 97 },
      { id: 21, name: "Piafabec", hp: 40, atk: 60, def: 30, atk_spe: 31, def_spe: 31, speed: 70 },
      { id: 22, name: "Rapasdepic", hp: 65, atk: 90, def: 65, atk_spe: 61, def_spe: 61, speed: 100 },
      { id: 23, name: "Abo", hp: 35, atk: 60, def: 44, atk_spe: 40, def_spe: 54, speed: 55 },
      { id: 24, name: "Arbok", hp: 60, atk: 85, def: 69, atk_spe: 65, def_spe: 79, speed: 80 },
      { id: 25, name: "Pikachu", hp: 35, atk: 55, def: 30, atk_spe: 50, def_spe: 40, speed: 90 },
      { id: 26, name: "Raichu", hp: 60, atk: 90, def: 55, atk_spe: 90, def_spe: 80, speed: 100 },
      { id: 27, name: "Sabelette", hp: 50, atk: 75, def: 85, atk_spe: 20, def_spe: 30, speed: 40 },
      { id: 28, name: "Sablaireau", hp: 75, atk: 100, def: 110, atk_spe: 45, def_spe: 55, speed: 65 },
      { id: 29, name: "Nidoran F", hp: 55, atk: 47, def: 52, atk_spe: 40, def_spe: 40, speed: 41 },
      { id: 30, name: "Nidorina", hp: 70, atk: 62, def: 67, atk_spe: 55, def_spe: 55, speed: 56 },
      { id: 31, name: "Nidoqueen", hp: 90, atk: 82, def: 87, atk_spe: 75, def_spe: 85, speed: 76 },
      { id: 32, name: "Nidoran M", hp: 46, atk: 57, def: 40, atk_spe: 40, def_spe: 40, speed: 50 },
      { id: 33, name: "Nidorino", hp: 61, atk: 72, def: 57, atk_spe: 55, def_spe: 55, speed: 65 },
      { id: 34, name: "Nidoking", hp: 81, atk: 92, def: 77, atk_spe: 85, def_spe: 75, speed: 85 },
      { id: 35, name: "Melofee", hp: 70, atk: 45, def: 48, atk_spe: 60, def_spe: 65, speed: 35 },
      { id: 36, name: "Melodelfe", hp: 95, atk: 70, def: 73, atk_spe: 85, def_spe: 90, speed: 60 },
      { id: 37, name: "Goupix", hp: 38, atk: 41, def: 40, atk_spe: 50, def_spe: 65, speed: 65 },
      { id: 38, name: "Feunard", hp: 73, atk: 76, def: 75, atk_spe: 81, def_spe: 100, speed: 100 },
      { id: 39, name: "Rondoudou", hp: 115, atk: 45, def: 20, atk_spe: 45, def_spe: 25, speed: 20 },
      { id: 40, name: "Grodoudou", hp: 140, atk: 70, def: 45, atk_spe: 75, def_spe: 50, speed: 45 },
      { id: 41, name: "Nosferapti", hp: 40, atk: 45, def: 35, atk_spe: 30, def_spe: 40, speed: 55 },
      { id: 42, name: "Nosferalto", hp: 75, atk: 80, def: 70, atk_spe: 65, def_spe: 75, speed: 90 },
      { id: 43, name: "Mystherbe", hp: 45, atk: 50, def: 55, atk_spe: 75, def_spe: 65, speed: 30 },
      { id: 44, name: "Ortide", hp: 60, atk: 65, def: 70, atk_spe: 85, def_spe: 75, speed: 40 },
      { id: 45, name: "Rafflesia", hp: 75, atk: 80, def: 85, atk_spe: 100, def_spe: 90, speed: 50 },
      { id: 46, name: "Paras", hp: 35, atk: 70, def: 55, atk_spe: 45, def_spe: 55, speed: 25 },
      { id: 47, name: "Parasect", hp: 60, atk: 95, def: 80, atk_spe: 60, def_spe: 80, speed: 30 },
      { id: 48, name: "Mimitoss", hp: 60, atk: 55, def: 50, atk_spe: 40, def_spe: 55, speed: 45 },
      { id: 49, name: "Aeromite", hp: 70, atk: 65, def: 60, atk_spe: 90, def_spe: 75, speed: 90 },
      { id: 50, name: "Taupiqueur", hp: 10, atk: 55, def: 25, atk_spe: 35, def_spe: 45, speed: 95 },
      { id: 51, name: "Triopikeur", hp: 35, atk: 80, def: 50, atk_spe: 50, def_spe: 70, speed: 120 },
      { id: 52, name: "Miaouss", hp: 40, atk: 45, def: 35, atk_spe: 40, def_spe: 40, speed: 90 },
      { id: 53, name: "Persian", hp: 65, atk: 70, def: 60, atk_spe: 65, def_spe: 65, speed: 115 },
      { id: 54, name: "Psykokwak", hp: 50, atk: 52, def: 48, atk_spe: 65, def_spe: 50, speed: 55 },
      { id: 55, name: "Akwakwak", hp: 80, atk: 82, def: 78, atk_spe: 95, def_spe: 80, speed: 85 },
      { id: 56, name: "Ferosinge", hp: 40, atk: 80, def: 35, atk_spe: 35, def_spe: 45, speed: 70 },
      { id: 57, name: "Colossinge", hp: 65, atk: 105, def: 60, atk_spe: 60, def_spe: 70, speed: 95 },
      { id: 58, name: "Caninos", hp: 55, atk: 70, def: 45, atk_spe: 70, def_spe: 50, speed: 60 },
      { id: 59, name: "Arcanin", hp: 90, atk: 110, def: 80, atk_spe: 100, def_spe: 80, speed: 95 },
      { id: 60, name: "Ptitard", hp: 40, atk: 50, def: 40, atk_spe: 40, def_spe: 40, speed: 90 },
      { id: 61, name: "Tetarte", hp: 65, atk: 65, def: 65, atk_spe: 50, def_spe: 50, speed: 90 },
      { id: 62, name: "Tartard", hp: 90, atk: 85, def: 95, atk_spe: 70, def_spe: 90, speed: 70 },
      { id: 63, name: "Abra", hp: 25, atk: 20, def: 15, atk_spe: 105, def_spe: 55, speed: 90 },
      { id: 64, name: "Kadabra", hp: 40, atk: 35, def: 30, atk_spe: 120, def_spe: 70, speed: 105 },
      { id: 65, name: "Alakazam", hp: 55, atk: 50, def: 45, atk_spe: 135, def_spe: 85, speed: 120 },
      { id: 66, name: "Machoc", hp: 70, atk: 80, def: 50, atk_spe: 35, def_spe: 35, speed: 35 },
      { id: 67, name: "Machopeur", hp: 80, atk: 100, def: 70, atk_spe: 50, def_spe: 60, speed: 45 },
      { id: 68, name: "Mackogneur", hp: 90, atk: 130, def: 80, atk_spe: 65, def_spe: 85, speed: 55 },
      { id: 69, name: "Chetiflor", hp: 50, atk: 75, def: 35, atk_spe: 70, def_spe: 30, speed: 40 },
      { id: 70, name: "Boustiflor", hp: 65, atk: 90, def: 50, atk_spe: 85, def_spe: 45, speed: 55 },
      { id: 71, name: "Empiflor", hp: 80, atk: 105, def: 65, atk_spe: 100, def_spe: 60, speed: 70 },
      { id: 72, name: "Tentacool", hp: 40, atk: 40, def: 35, atk_spe: 50, def_spe: 100, speed: 70 },
      { id: 73, name: "Tentacruel", hp: 80, atk: 70, def: 65, atk_spe: 80, def_spe: 120, speed: 100 },
      { id: 74, name: "Racaillou", hp: 40, atk: 80, def: 100, atk_spe: 30, def_spe: 30, speed: 20 },
      { id: 75, name: "Gravalanch", hp: 55, atk: 95, def: 115, atk_spe: 45, def_spe: 45, speed: 35 },
      { id: 76, name: "Grolem", hp: 80, atk: 110, def: 130, atk_spe: 55, def_spe: 65, speed: 45 },
      { id: 77, name: "Ponyta", hp: 50, atk: 85, def: 55, atk_spe: 65, def_spe: 65, speed: 90 },
      { id: 78, name: "Galopa", hp: 65, atk: 100, def: 70, atk_spe: 80, def_spe: 80, speed: 105 },
      { id: 79, name: "Ramoloss", hp: 90, atk: 65, def: 65, atk_spe: 40, def_spe: 40, speed: 15 },
      { id: 80, name: "Flagadoss", hp: 95, atk: 75, def: 110, atk_spe: 100, def_spe: 80, speed: 30 },
      { id: 81, name: "Magneti", hp: 25, atk: 35, def: 70, atk_spe: 95, def_spe: 55, speed: 45 },
      { id: 82, name: "Magneton", hp: 50, atk: 60, def: 95, atk_spe: 120, def_spe: 70, speed: 70 },
      { id: 83, name: "Canarticho", hp: 52, atk: 65, def: 55, atk_spe: 58, def_spe: 62, speed: 60 },
      { id: 84, name: "Doduo", hp: 35, atk: 85, def: 45, atk_spe: 35, def_spe: 35, speed: 75 },
      { id: 85, name: "Dodrio", hp: 60, atk: 110, def: 70, atk_spe: 60, def_spe: 60, speed: 100 },
      { id: 86, name: "Otaria", hp: 65, atk: 45, def: 55, atk_spe: 45, def_spe: 70, speed: 45 },
      { id: 87, name: "Lamantine", hp: 90, atk: 70, def: 80, atk_spe: 70, def_spe: 95, speed: 70 },
      { id: 88, name: "Tadmorv", hp: 80, atk: 80, def: 50, atk_spe: 40, def_spe: 50, speed: 25 },
      { id: 89, name: "Grotadmorv", hp: 105, atk: 105, def: 75, atk_spe: 65, def_spe: 100, speed: 50 },
      { id: 90, name: "Kokiyas", hp: 30, atk: 65, def: 100, atk_spe: 45, def_spe: 25, speed: 40 },
      { id: 91, name: "Crustabri", hp: 50, atk: 95, def: 180, atk_spe: 85, def_spe: 45, speed: 70 },
      { id: 92, name: "Fantominus", hp: 30, atk: 35, def: 30, atk_spe: 100, def_spe: 35, speed: 80 },
      { id: 93, name: "Spectrum", hp: 45, atk: 50, def: 45, atk_spe: 115, def_spe: 55, speed: 95 },
      { id: 94, name: "Ectoplasma", hp: 60, atk: 65, def: 60, atk_spe: 130, def_spe: 75, speed: 110 },
      { id: 95, name: "Onix", hp: 35, atk: 45, def: 160, atk_spe: 30, def_spe: 45, speed: 70 },
      { id: 96, name: "Soporifik", hp: 60, atk: 48, def: 45, atk_spe: 43, def_spe: 90, speed: 42 },
      { id: 97, name: "Hypnomade", hp: 85, atk: 73, def: 70, atk_spe: 73, def_spe: 115, speed: 67 },
      { id: 98, name: "Krabby", hp: 30, atk: 105, def: 90, atk_spe: 25, def_spe: 25, speed: 50 },
      { id: 99, name: "Krabboss", hp: 55, atk: 130, def: 115, atk_spe: 50, def_spe: 50, speed: 75 },
      { id: 100, name: "Voltorbe", hp: 40, atk: 30, def: 50, atk_spe: 55, def_spe: 55, speed: 100 },
      { id: 101, name: "Electrode", hp: 60, atk: 50, def: 70, atk_spe: 80, def_spe: 80, speed: 140 },
      { id: 102, name: "Noeunoeuf", hp: 60, atk: 40, def: 80, atk_spe: 60, def_spe: 45, speed: 40 },
      { id: 103, name: "Noadkoko", hp: 95, atk: 95, def: 85, atk_spe: 125, def_spe: 65, speed: 55 },
      { id: 104, name: "Osselait", hp: 50, atk: 50, def: 95, atk_spe: 40, def_spe: 50, speed: 35 },
      { id: 105, name: "Ossatueur", hp: 60, atk: 80, def: 110, atk_spe: 50, def_spe: 80, speed: 45 },
      { id: 106, name: "Kicklee", hp: 50, atk: 120, def: 53, atk_spe: 35, def_spe: 110, speed: 87 },
      { id: 107, name: "Tygnon", hp: 50, atk: 105, def: 79, atk_spe: 35, def_spe: 110, speed: 76 },
      { id: 108, name: "Excelangue", hp: 90, atk: 55, def: 75, atk_spe: 60, def_spe: 75, speed: 30 },
      { id: 109, name: "Smogo", hp: 40, atk: 65, def: 95, atk_spe: 60, def_spe: 45, speed: 35 },
      { id: 110, name: "Smogogo", hp: 65, atk: 90, def: 120, atk_spe: 85, def_spe: 70, speed: 60 },
      { id: 111, name: "Rhinocorne", hp: 80, atk: 85, def: 95, atk_spe: 30, def_spe: 30, speed: 25 },
      { id: 112, name: "Rhinoferos", hp: 105, atk: 130, def: 120, atk_spe: 45, def_spe: 45, speed: 40 },
      { id: 113, name: "Leveinard", hp: 250, atk: 5, def: 5, atk_spe: 35, def_spe: 105, speed: 50 },
      { id: 114, name: "Saquedeneu", hp: 65, atk: 55, def: 115, atk_spe: 100, def_spe: 40, speed: 60 },
      { id: 115, name: "Kangourex", hp: 105, atk: 95, def: 80, atk_spe: 40, def_spe: 80, speed: 90 },
      { id: 116, name: "Hypotrempe", hp: 30, atk: 40, def: 70, atk_spe: 70, def_spe: 25, speed: 60 },
      { id: 117, name: "Hypocean", hp: 55, atk: 65, def: 95, atk_spe: 95, def_spe: 45, speed: 85 },
      { id: 118, name: "Poissirene", hp: 45, atk: 67, def: 60, atk_spe: 35, def_spe: 50, speed: 63 },
      { id: 119, name: "Poissoroy", hp: 80, atk: 92, def: 65, atk_spe: 65, def_spe: 80, speed: 68 },
      { id: 120, name: "Stari", hp: 30, atk: 45, def: 55, atk_spe: 70, def_spe: 55, speed: 85 },
      { id: 121, name: "Staross", hp: 60, atk: 75, def: 85, atk_spe: 100, def_spe: 85, speed: 115 },
      { id: 122, name: "M.Mime", hp: 40, atk: 45, def: 65, atk_spe: 100, def_spe: 120, speed: 90 },
      { id: 123, name: "Insecateur", hp: 70, atk: 110, def: 80, atk_spe: 55, def_spe: 80, speed: 105 },
      { id: 124, name: "Lippoutou", hp: 65, atk: 50, def: 35, atk_spe: 115, def_spe: 95, speed: 95 },
      { id: 125, name: "Elektek", hp: 65, atk: 83, def: 57, atk_spe: 95, def_spe: 85, speed: 105 },
      { id: 126, name: "Magmar", hp: 65, atk: 95, def: 57, atk_spe: 100, def_spe: 85, speed: 93 },
      { id: 127, name: "Scarabrute", hp: 65, atk: 125, def: 100, atk_spe: 55, def_spe: 70, speed: 85 },
      { id: 128, name: "Tauros", hp: 75, atk: 100, def: 95, atk_spe: 40, def_spe: 70, speed: 110 },
      { id: 129, name: "Magicarpe", hp: 20, atk: 10, def: 55, atk_spe: 15, def_spe: 20, speed: 80 },
      { id: 130, name: "Leviator", hp: 95, atk: 125, def: 79, atk_spe: 60, def_spe: 100, speed: 81 },
      { id: 131, name: "Lokhlass", hp: 130, atk: 85, def: 80, atk_spe: 85, def_spe: 95, speed: 60 },
      { id: 132, name: "Metamorph", hp: 48, atk: 48, def: 48, atk_spe: 48, def_spe: 48, speed: 48 },
      { id: 133, name: "Evoli", hp: 55, atk: 55, def: 50, atk_spe: 45, def_spe: 65, speed: 55 },
      { id: 134, name: "Aquali", hp: 130, atk: 65, def: 60, atk_spe: 110, def_spe: 95, speed: 65 },
      { id: 135, name: "Voltali", hp: 65, atk: 65, def: 60, atk_spe: 110, def_spe: 95, speed: 130 },
      { id: 136, name: "Pyroli", hp: 65, atk: 130, def: 60, atk_spe: 95, def_spe: 110, speed: 65 },
      { id: 137, name: "Porygon", hp: 65, atk: 60, def: 70, atk_spe: 85, def_spe: 75, speed: 40 },
      { id: 138, name: "Amonita", hp: 35, atk: 40, def: 100, atk_spe: 90, def_spe: 55, speed: 35 },
      { id: 139, name: "Amonistar", hp: 70, atk: 60, def: 125, atk_spe: 115, def_spe: 70, speed: 55 },
      { id: 140, name: "Kabuto", hp: 30, atk: 80, def: 90, atk_spe: 55, def_spe: 45, speed: 55 },
      { id: 141, name: "Kabutops", hp: 60, atk: 115, def: 105, atk_spe: 65, def_spe: 70, speed: 80 },
      { id: 142, name: "Ptera", hp: 80, atk: 105, def: 65, atk_spe: 60, def_spe: 75, speed: 130 },
      { id: 143, name: "Ronflex", hp: 160, atk: 110, def: 65, atk_spe: 65, def_spe: 110, speed: 30 },
      { id: 144, name: "Artikodin", hp: 90, atk: 85, def: 100, atk_spe: 95, def_spe: 125, speed: 85 },
      { id: 145, name: "Electhor", hp: 90, atk: 90, def: 85, atk_spe: 125, def_spe: 90, speed: 100 },
      { id: 146, name: "Sulfura", hp: 90, atk: 100, def: 90, atk_spe: 125, def_spe: 85, speed: 90 },
      { id: 147, name: "Minidraco", hp: 41, atk: 64, def: 45, atk_spe: 50, def_spe: 50, speed: 50 },
      { id: 148, name: "Draco", hp: 61, atk: 84, def: 65, atk_spe: 70, def_spe: 70, speed: 70 },
      { id: 149, name: "Dracolosse", hp: 91, atk: 134, def: 95, atk_spe: 100, def_spe: 100, speed: 80 },
      { id: 150, name: "Mewtwo", hp: 106, atk: 110, def: 90, atk_spe: 154, def_spe: 90, speed: 130 },
      { id: 151, name: "Mew", hp: 100, atk: 100, def: 100, atk_spe: 100, def_spe: 100, speed: 100 },
    ];
    await Pokemon.bulkCreate(pokemons, {
      transaction: t,
      updateOnDuplicate: ["name", "hp", "atk", "def", "atk_spe", "def_spe", "speed"],
    });
    console.log("✅ Pokémons créés\n");
    // ————————————————————————————————————————————————————————————
    // 3) USER
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Création des utilisateurs...");
    await User.bulkCreate(
      [
        { id: 1, username: "user1", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 2, username: "user2", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 3, username: "user3", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 4, username: "user4", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 5, username: "user5", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 6, username: "user6", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 7, username: "user7", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 8, username: "user8", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 9, username: "user9", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 10, username: "user10", role: "admin", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 11, username: "user11", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 12, username: "user12", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 13, username: "user13", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 14, username: "user14", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 15, username: "user15", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 16, username: "user16", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 17, username: "user17", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 18, username: "user18", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 19, username: "user19", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 20, username: "user20", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 21, username: "user21", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 22, username: "user22", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 23, username: "user23", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 24, username: "user24", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 25, username: "user25", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 26, username: "user26", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 27, username: "user27", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 28, username: "user28", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 29, username: "user29", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 30, username: "user30", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 31, username: "user31", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 32, username: "user32", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 33, username: "user33", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 34, username: "user34", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 35, username: "user35", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 36, username: "user36", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 37, username: "user37", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 38, username: "user38", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 39, username: "user39", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 40, username: "user40", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 41, username: "user41", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 42, username: "user42", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 43, username: "user43", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 44, username: "user44", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 45, username: "user45", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 46, username: "user46", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 47, username: "user47", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 48, username: "user48", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 49, username: "user49", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" },
        { id: 50, username: "user50", role: "member", password: "$argon2id$v=19$m=65536,t=3,p=4$A5k8hA5iedzpz29gkhaILQ$yxb2/F7f102YuwHYGxIYCPoGUj6Giz7oixzaMlpiLNM" }
      ],
      {
        transaction: t,
        updateOnDuplicate: ["username", "role", "password"],
      }
    );
    console.log("✅ Utilisateurs créés\n");

    // ————————————————————————————————————————————————————————————
    // 4) TEAMS
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Création des teams...");
    const teams = [
      { id: 1, name: "Ultimate Team", description: "La meilleure team du monde", user_id: 1 },
      { id: 2, name: "La Team de l'enfer", description: "Le feuuuuu", user_id: 1 },
      { id: 3, name: "Squad fofolle", description: "Pour tout gagner", user_id: 2 },
    ];
    await Team.bulkCreate(teams, {
      transaction: t,
      updateOnDuplicate: ["name", "description"],
    });
    console.log("✅ Teams créées\n");

    // ————————————————————————————————————————————————————————————
    // 4) ASSOCIATIONS (POKÉMON ⟷ TYPE) & (POKÉMON ⟷ TEAM)
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Association des types aux pokémons...");
    const pokemonTypePairs = [
      [1, 10], [1, 11], [2, 10], [2, 11], [3, 10], [3, 11], [4, 6], [5, 6],
      [6, 6], [6, 17], [7, 4], [8, 4], [9, 4], [10, 8], [11, 8], [12, 8], [12, 17],
      [13, 8], [13, 11], [14, 8], [14, 11], [15, 8], [15, 11], [16, 9], [16, 17],
      [17, 9], [17, 17], [18, 9], [18, 17], [19, 9], [20, 9], [21, 9], [21, 17],
      [22, 9], [22, 17], [23, 11], [24, 11], [25, 5], [26, 5], [27, 14], [28, 14],
      [29, 11], [30, 11], [31, 11], [31, 14], [32, 11], [33, 11], [34, 11], [34, 14],
      [35, 9], [36, 9], [37, 6], [38, 6], [39, 9], [40, 9], [41, 11], [41, 17],
      [42, 11], [42, 17], [43, 10], [43, 11], [44, 10], [44, 11], [45, 10], [45, 11],
      [46, 8], [46, 10], [47, 8], [47, 10], [48, 8], [48, 11], [49, 8], [49, 11],
      [50, 14], [51, 14], [52, 9], [53, 9], [54, 4], [55, 4], [56, 2], [57, 2],
      [58, 6], [59, 6], [60, 4], [61, 4], [62, 4], [62, 2], [63, 12], [64, 12],
      [65, 12], [66, 2], [67, 2], [68, 2], [69, 10], [69, 11], [70, 10], [70, 11],
      [71, 10], [71, 11], [72, 4], [72, 11], [73, 4], [73, 11], [74, 13], [74, 14],
      [75, 13], [75, 14], [76, 13], [76, 14], [77, 6], [78, 6], [79, 4], [79, 12],
      [80, 4], [80, 12], [81, 5], [81, 1], [82, 5], [82, 1], [83, 9], [83, 17],
      [84, 9], [84, 17], [85, 9], [85, 17], [86, 4], [87, 4], [87, 7], [88, 11],
      [89, 11], [90, 4], [91, 4], [91, 7], [92, 15], [92, 11], [93, 15], [93, 11],
      [94, 15], [94, 11], [95, 13], [95, 14], [96, 12], [97, 12], [98, 4], [99, 4],
      [100, 5], [101, 5], [102, 10], [102, 12], [103, 10], [103, 12], [104, 14], [105, 14],
      [106, 2], [107, 2], [108, 9], [109, 11], [110, 11], [111, 14], [111, 13], [112, 14],
      [112, 13], [113, 9], [114, 10], [115, 9], [116, 4], [117, 4], [118, 4], [119, 4],
      [120, 4], [121, 4], [121, 12], [122, 12], [123, 8], [123, 17], [124, 7], [124, 12],
      [125, 5], [126, 6], [127, 8], [128, 9], [129, 4], [130, 4], [130, 17], [131, 4],
      [131, 7], [132, 9], [133, 9], [134, 4], [135, 5], [136, 6], [137, 9], [138, 13],
      [138, 4], [139, 13], [139, 4], [140, 13], [140, 4], [141, 13], [141, 4], [142, 13],
      [142, 17], [143, 9], [144, 7], [144, 17], [145, 5], [145, 17], [146, 6], [146, 17],
      [147, 3], [148, 3], [149, 3], [149, 17], [150, 12], [151, 12],
    ];

    const pokemonMap = new Map((await Pokemon.findAll({ transaction: t })).map(p => [p.id, p]));
    const typeMap = new Map((await Type.findAll({ transaction: t })).map(tp => [tp.id, tp]));

    await Promise.all(
      pokemonTypePairs.map(async ([pid, tid]) => {
        const p = pokemonMap.get(pid);
        const ty = typeMap.get(tid);
        if (p && ty) await p.addType(ty, { transaction: t });
      })
    );
    console.log("✅ Types associés aux pokémons\n");

    console.log("🌱 Association des pokémons aux teams...");
    const teamPokemonPairs = [
      [3, 1], [6, 1], [9, 1], [12, 1], [15, 1], [34, 1],
      [6, 2], [38, 2], [59, 2], [126, 2], [136, 2], [146, 2],
      [151, 3], [150, 3], [149, 3], [146, 3], [145, 3], [144, 3],
    ];
    const teamMap = new Map((await Team.findAll({ transaction: t })).map(tm => [tm.id, tm]));
    await Promise.all(
      teamPokemonPairs.map(async ([pid, tid]) => {
        const p = pokemonMap.get(pid);
        const team = teamMap.get(tid);
        if (p && team) await p.addTeam(team, { transaction: t });
      })
    );
    console.log("✅ Pokémons associés aux teams\n");

    // ————————————————————————————————————————————————————————————
    // 5) RÉALIGNER LES SÉQUENCES (IMPORTANT si ids forcés ci-dessus)
    // ————————————————————————————————————————————————————————————
    for (const table of ["type", "pokemon", "team", "user"]) {
      await sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"${table}"','id'),
                       COALESCE((SELECT MAX(id) FROM "${table}"), 0))`,
        { transaction: t }
      );
    }

    // ————————————————————————————————————————————————————————————
    // 6) AJOUTS DE VOTES 
    // ————————————————————————————————————————————————————————————
    console.log("🌱 Création des votes...");

    const userIds = Array.from({ length: 50 }, (_, i) => i + 1);
    const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);

    const votes = [];
    // Chaque user vote pour 10 pokémons différents (décalage pour diversité)
    userIds.forEach((userId, idx) => {
      for (let j = 0; j < 10; j++) {
        // Décalage pour que les votes ne soient pas tous sur les mêmes pokémons
        const pokemonId = pokemonIds[(idx * 7 + j) % pokemonIds.length];
        // Empêche les doublons pour un user
        if (!votes.find(v => v.user_id === userId && v.pokemon_id === pokemonId)) {
          votes.push({
            user_id: userId,
            pokemon_id: pokemonId,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }
    });

    await sequelize.models.user_pokemon_vote.bulkCreate(votes, { transaction: t });
    console.log("✅ Votes créés\n");

    const UserPokemonVote = sequelize.models.user_pokemon_vote || sequelize.models.UserPokemonVote;
    const PokemonModel = sequelize.models.Pokemon;

    for (let pokemonId = 1; pokemonId <= 151; pokemonId++) {
      const count = await UserPokemonVote.count({ where: { pokemon_id: pokemonId }, transaction: t });
      await PokemonModel.update({ votes: count }, { where: { id: pokemonId }, transaction: t });
    }

    // ————————————————————————————————————————————————————————————
    // COMMIT
    // ————————————————————————————————————————————————————————————
    await t.commit();
    console.log("🌱 Seeding terminé avec succès !");
  } catch (err) {
    await t.rollback();
    console.error("❌ Erreur lors du seeding :", err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seed();
