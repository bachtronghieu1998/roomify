import puter from "@heyputer/puter.js";
import { getOrCreateHostingonfig, uploadImageToHosting } from "./puter.hosting";
import { isHostedUrl } from "./utils";

export const signIn = async () => {
  await puter.auth.signIn();
};

export const signOut = async () => {
  await puter.auth.signOut();
};

export const getCurrentUser = async () => {
  try {
    return await puter.auth.getUser();
  } catch (error) {
    return null;
  }
};

export const createProject = async ({
  item,
}: CreateProjectParams): Promise<DesignItem | null | undefined> => {
  const projectId = item.id;
  const hosting = await getOrCreateHostingonfig();

  const hostedSource = projectId
    ? await uploadImageToHosting({
        hosting,
        url: item.sourceImage,
        projectId,
        label: "source",
      })
    : null;

  const hostedRender =
    projectId && item.renderedImage
      ? await uploadImageToHosting({
          hosting,
          url: item.renderedImage,
          projectId,
          label: "rendered",
        })
      : null;

  const resolvedSource =
    hostedSource?.url ||
    (isHostedUrl(item.sourceImage) ? item.sourceImage : "");

  if (!resolvedSource) {
    console.warn("Faile to host source image, skip saving");
    return null;
  }

  const resolvedRender = hostedRender?.url
    ? hostedRender.url
    : item.renderedImage && isHostedUrl(item.renderedImage)
      ? item.renderedImage
      : undefined;

  const {
    sourcePath: _sourcePath,
    renderedPath: _renderPath,
    publicPath: _publicPath,
    ...rest
  } = item;

  const payload = {
    ...rest,
    sourceImage: resolvedSource,
    resolvedRender: resolvedRender,
  };

  try {
    return payload;
  } catch (error) {
    console.warn(error);
  }
};
