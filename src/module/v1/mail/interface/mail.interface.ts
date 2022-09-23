export interface ISendMail {
  to: string;
  subject: string;
  template: string;
  context: object;
}
