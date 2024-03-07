import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database-config";

class Books extends Model {}

Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publicactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("genre").split(";");
      },
      set(val: string[]) {
        this.setDataValue("genre", val.join(";"));
      },
    },
  },
  {
    sequelize,
    modelName: "Books",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Books;
