import {
  Message,
  MethodKind,
  PartialMessage,
  ServiceType,
  proto3,
} from "@bufbuild/protobuf";

export class Empty extends Message<Empty> {
  constructor(data?: PartialMessage<Empty>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "riggr.common.v1.Empty";
  static readonly fields = proto3.util.newFieldList(() => []);
}

export class Version extends Message<Version> {
  constructor(data?: PartialMessage<Version>) {
    super();
    proto3.util.initPartial(data, this);
  }

  name = "";
  version = "";
  gitSha = "";

  static readonly runtime = proto3;
  static readonly typeName = "riggr.common.v1.Version";
  static readonly fields = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    {
      no: 3,
      name: "git_sha",
      jsonName: "gitSha",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
  ]);
}

export const AgentService = {
  typeName: "riggr.agent.v1.AgentService",
  methods: {
    getVersion: {
      name: "GetVersion",
      I: Empty,
      O: Version,
      kind: MethodKind.Unary,
    },
  },
} as const satisfies ServiceType;
