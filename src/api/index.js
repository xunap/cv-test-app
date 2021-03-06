import { v4 as uuidv4 } from 'uuid';

export const checkContent = (content) => {
  const result = [];
  if (content && content.toLowerCase && content.toLowerCase().includes("i've done many projects")) {
    result.push({
      id: uuidv4(),
      range: [content.toLowerCase().indexOf("i've done many projects"), content.toLowerCase().indexOf("i've done many projects") + "i've done many projects".length],
      message: 'Include a valuable metric if possible. For example: “Increased revenue by 20% within one month.”.',
    });
  }

  if (content && content.toLowerCase && content.toLowerCase().includes('many projects')) {
    result.push({
      id: uuidv4(),
      range: [content.toLowerCase().indexOf('many projects'), content.toLowerCase().indexOf('many projects') + 'many projects'.length],
      message: 'This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”',
    });
  }

  return result;
};
