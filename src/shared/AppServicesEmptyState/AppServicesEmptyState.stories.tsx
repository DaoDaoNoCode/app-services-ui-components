import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AppServicesEmptyState,
  AppServicesEmptyStateVariant,
} from "./AppServicesEmptyState";

export default {
  title: "Empty States/App Services",
  component: AppServicesEmptyState,
  parameters: {
  },
} as ComponentMeta<typeof AppServicesEmptyState>;

const Template: ComponentStory<typeof AppServicesEmptyState> = (
  args,
  { parameters }
) => (
  <div style={{ height: parameters.previewHeight }}>
    <AppServicesEmptyState {...args} />
  </div>
);

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  titleProps: {
    title: "Default Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  }
};
DefaultStory.storyName = "Default";

export const GettingStartedStory = Template.bind({});
GettingStartedStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.GettingStarted,
  },
  titleProps: {
    title: "Getting Started Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
GettingStartedStory.storyName = "Getting Started";

export const NoAccessStory = Template.bind({});
NoAccessStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.NoAccess,
  },
  titleProps: {
    title: "No Access Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
NoAccessStory.storyName = "No Access";

export const NoItemsStory = Template.bind({});
NoItemsStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.NoItems,
  },
  titleProps: {
    title: "No Items Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
NoItemsStory.storyName = "No Items";

export const NoResultStory = Template.bind({});
NoResultStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.NoResult,
  },
  titleProps: {
    title: "No Result Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
NoResultStory.storyName = "No Result";

export const UnexpectedErrorStory = Template.bind({});
UnexpectedErrorStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.UnexpectedError,
  },
  titleProps: {
    title: "Unexpected Error Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
UnexpectedErrorStory.storyName = "Unexpected Error";

export const PageNotFoundStory = Template.bind({});
PageNotFoundStory.args = {
  emptyStateProps: {
    variant: AppServicesEmptyStateVariant.PageNotFound,
  },
  titleProps: {
    title: "Page Not Found Empty State",
    headingLevel: "h1",
  },
  emptyStateBodyProps: {
    body: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
  },
};
PageNotFoundStory.storyName = "Page Not Found";
