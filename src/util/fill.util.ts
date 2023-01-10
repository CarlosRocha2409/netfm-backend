import dbConfig from "../config/db.config";
import logger from "../logger/api.logger";
import { Note } from "../models/note.model";
import { Topic } from "../models/topic.model";

function fillTopics() {
  return dbConfig.getRepository(Topic).insert([
    {
      title: "Work",
    },
    {
      title: "School",
    },
    {
      title: "Personal",
    },
    {
      title: "General",
    },
  ]);
}

function fillNotes() {
  return dbConfig.getRepository(Note).insert([
    {
      title: "Note #1",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique venenatis lectus at sodales. Vivamus eget tortor sodales, posuere massa quis, ultricies magna. Cras finibus tellus at pharetra ultrices. Quisque condimentum sem et libero luctus sodales. Duis id orci fermentum, varius elit vitae, scelerisque nisl. In feugiat a ex a egestas. Cras non turpis viverra, varius enim eu, pulvinar massa. Aliquam porta venenatis sem, vitae condimentum nibh feugiat eu. Vivamus tempor odio quis tortor aliquam, in dignissim neque sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus est in lacus viverra ultrices. Vestibulum vel augue nunc. Morbi vehicula vehicula dui, ut ultricies ante blandit nec. In vulputate nisi a erat scelerisque efficitur.",
      topicId: 1,
    },
    {
      title: "Note #2",
      body: "Aliquam rhoncus metus id tristique eleifend. Mauris in ullamcorper nunc. In et ultricies lacus. Aliquam vel nisl et neque volutpat mattis. Curabitur nec maximus elit, ut sodales augue. Aenean pellentesque ante dui, vitae hendrerit elit scelerisque vel. Vestibulum dignissim quis lorem ac egestas. Integer eu pulvinar elit, a condimentum mi. Donec enim dolor, gravida ac ligula eget, fermentum efficitur sem. Quisque consectetur arcu diam, eget tempor magna aliquam sit amet.",
      topicId: 2,
    },
    {
      title: "Note #3",
      body: "Integer lacinia pellentesque purus, vel condimentum augue gravida quis. Donec in nunc id nibh gravida pellentesque. Donec elementum arcu purus, a euismod lacus egestas id. Nunc vitae mauris feugiat lacus vulputate dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi lacinia rhoncus orci. Suspendisse rhoncus ligula eget tristique rutrum. Sed non mollis enim. Integer libero sem, varius in facilisis ac, dapibus a mi. Aliquam sit amet tincidunt arcu, a vestibulum leo. Proin a purus nec velit mattis interdum et in dui. Fusce maximus id orci a lobortis.",
      topicId: 3,
    },
    {
      title: "Note #4",
      body: "Maecenas ac gravida sapien. Pellentesque tincidunt porta tellus, id finibus dui volutpat finibus. Duis purus sem, iaculis blandit cursus dapibus, sodales in purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer fringilla justo id tortor venenatis ullamcorper. Morbi viverra diam justo, ut vestibulum turpis convallis in. Sed ac neque mauris. Cras malesuada eleifend interdum.",
      topicId: 4,
    },
  ]);
}

export async function fill() {
  const count = await dbConfig.getRepository(Note).count();
  if (count !== 0) return;
  return fillTopics().then(() => {
    return fillNotes().then(() => {
      logger.info("Succesfully filled data");
    });
  });
}
